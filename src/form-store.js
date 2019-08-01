import React, { Component } from 'react';
import Emitter from 'component-emitter';
export default function FormStore(Comp) {
  class EmitterWrapper extends Component {
    constructor(props) {
      super(props);
      // 内部emitter
      this.emitter = new Emitter();
      this.state = {
        // 表单值 map 格式：{field_1: 123, field_2: 234}
        formData: this.props.formData || {},
        // 表单上下文 map 格式: {key1: aaaa, key2}
        formContext: this.props.formContext || {},
        // 表单配置
        formConfig: this.props.formConfig || [] // 表单配置
      };
      // 遍历字段配置
      this.state.formConfig.fields.forEach((field) => {
        // 注册通用回调
        this.bindHandle(field);
        // 注册依赖回调
        this.bindDependHandle(field);
      });
    }

    /**
     * 注册通用回调
     *
     * @param {*} field 当前字段配置
     */
    bindHandle(field) {
      // 注册 changeValue 回调
      this.emitter.on(
        `${field.name}:changeValue`,
        (data, reset) => this.handle({
          eventTarget: field.name,
          eventType: 'changeValue',
          data,
          option: {
            reset
          }
        })
      );
      // 注册 resetValue 回调
      this.emitter.on(
        `${field.name}:resetValue`,
        () => this.handle({
          eventTarget: field.name,
          eventType: 'resetValue'
        })
      );
      // 注册 toggleVisible 回调
      this.emitter.on(
        `${field.name}:toggleVisible`,
        (visible) => this.handle({
          eventTarget: field.name,
          eventType: 'toggleVisible',
          option: {
            visible
          }
        })
      )

      this.emitter.on(
        `${field.name}:toggleRequired`,
        (required) => this.handle({
          eventTarget: field.name,
          eventType: 'toggleRequired',
          option: {
            required
          }
        })
      )

      // 注册 toggleDisabled 回调
      this.emitter.on(
        `${field.name}:toggleDisabled`,
        (disabled) => this.handle({
          eventTarget: field.name,
          eventType: 'toggleDisabled',
          option: {
            disabled
          }
        })
      )
    }

    /**
     * 注册联动回调
     *
     * @param {*} field 当前字段配置
     */
    bindDependHandle(field) {
      if (field.depends) {
        // 遍历依赖,注册依赖关系
        field.depends.forEach((depend) => {
          const handler = Array.isArray(depend.handler) ?
            depend.handler : [depend.handler];

          handler.forEach((item) => {
            this.emitter.on(
              `${depend.eventTarget}:${depend.eventType}`,
              (data) => this.handleDepend({
                data,
                field: field.name,
                handler: item
              })
            );
          });
        });
      }
    }

    /**
     * 通用事件回调，所有的事件都会最终走这里
     *
     * @param {*} { eventTarget, eventType, data, option }
     */
    handle({ eventTarget, eventType, data, option }) {
      console.log('触发事件:', '目标：', eventTarget, '类型：', eventType, '数据', data)
      switch (eventType) {
        // 字段值改变
        case 'changeValue':
          this.setState((state) => {
            return {
              formData: {
                ...state.formData,
                [eventTarget]: data
              }
            }
          }, () => {
            if (option.reset) {
              // 触发重置事件
              this.emitter.emit(`${eventTarget}:onResetValue`);
            }
            // 触发等于值相等事件
            this.emitter.emit(`${eventTarget}:equalValue:${data}`);
          });
          break;
        // 切换是否可见
        case 'toggleVisible':
          this.setState((state) => {
            state.formConfig.fields.forEach((field) => {
              if (field.name === eventTarget) {
                field.visible = option.visible
              }
            });
            return state;
          });
          break;
        // 切换是否必填
        case 'toggleRequired':
          this.setState((state) => {
            state.formConfig.fields.forEach((field) => {
              if (field.name === eventTarget) {
                let rules = field.rules;
                if (!Array.isArray(rules)) {
                  rules = [];
                }
                let tag = false; // 是否有required配置
                rules.forEach((rule) => {
                  if (rule.required !== undefined) {
                    tag = true;
                    rule.required = option.required;
                  }
                });
                if (!tag) {
                  rules.push({ required: option.required, message: '请填写' })
                }
                field.rules = rules;
              }
            });
            return state;
          });
          break;
        // 切换是否可编辑
        case 'toggleDisabled':
          this.setState((state) => {
            state.formConfig.fields.forEach((field) => {
              if (field.name === eventTarget) {
                field.disabled = option.disabled
              }
            });
            return state;
          });
          break;
      }
    }


    /**
     * 依赖回调，触发事件可被通用回调或字段对应名称回调方法捕获
     *
     * @param {*} { field, handler, data }
     * @memberof EmitterWrapper
     */
    handleDepend({ field, handler, data }) {
      const fieldCof = this.state.formConfig.fields.find(v => v.name === field);
      const { defaultValue } = fieldCof;
      const handlerParts = handler.split(':');
      const handlerName = handlerParts[0];
      const handleParams = handlerParts.slice(1);
      switch (handlerName) {
        case 'resetValue':
          this.emitter.emit(`${field}:changeValue`, defaultValue, { reset: true });
          break;
        case 'toggleVisible':
          this.emitter.emit(`${field}:toggleVisible`, handleParams[0] == 1);
          break;
        case 'toggleDisabled':
          this.emitter.emit(`${field}:toggleDisabled`, handleParams[0] == 1);
          break;
        case 'toggleRequired':
          this.emitter.emit(`${field}:toggleRequired`, handleParams[0] == 1);
          break;
      }
    }

    render() {
      const { formData, formConfig: { fields, groups } } = this.state;
      return <Comp
        onCreate={this.props.onCreate}
        formStore={{
          fields,
          groups,
          data: formData,
          emitter: this.emitter
        }} />;
    }
  }
  return EmitterWrapper;
}