import React, { Component } from 'react';
import Emitter from 'component-emitter';
import FormAjax from './form-ajax';
import { getFieldByName } from './utils';

export default function FormStore(Comp) {
  class EmitterWrapper extends Component {
    constructor(props) {
      super(props);

      this.emitter = new Emitter();

      this.state = {
        formData: this.props.formData || {},
        formConfig: this.props.formConfig || []
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
      // 注册 change 回调
      this.emitter.on(
        `${field.name}:change`,
        (data, reset) => this.handle({
          target: field.name,
          type: 'change',
          data,
          option: {
            reset
          }
        })
      );
      // 注册 reset 回调
      this.emitter.on(
        `${field.name}:reset`,
        () => this.handle({
          target: field.name,
          type: 'reset'
        })
      );
      // 注册 toggleVisible 回调
      this.emitter.on(
        `${field.name}:toggleVisible`,
        (visible) => this.handle({
          target: field.name,
          type: 'toggleVisible',
          option: {
            visible
          }
        })
      )

      // 注册 toggleDisabled 回调
      this.emitter.on(
        `${field.name}:toggleDisabled`,
        (disabled) => this.handle({
          target: field.name,
          type: 'toggleDisabled',
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
      if (field.dependEvents) {
        // 遍历依赖,注册依赖关系
        field.dependEvents.forEach((depend) => {
          const handler = Array.isArray(depend.handler) ?
            depend.handler : [depend.handler];

          handler.forEach((item) => {
            this.emitter.on(
              `${depend.target}:${depend.type}`,
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
     * @param {*} { target, type, data, option }
     */
    handle({ target, type, data, option }) {
      console.log('触发事件:', '目标：', target, '类型：', type, '数据', data)
      switch (type) {
        // 字段值改变
        case 'change':
          this.setState((state) => {
            return {
              formData: {
                ...state.formData,
                [target]: data
              }
            }
          }, () => {
            if (option.reset) {
              // 对于需要远程加载数据的字段，本地调用即可
              const currentField = getFieldByName(target, this.state.formConfig.fields);
              const { remote } = currentField;
              // 触发重置事件
              if (remote){
                const { formData } = this.state;
                const { formContext } = this.props;
                const data = null;

                FormAjax
                  .getData({ formData, formContext, remote})
                  .then((data) => {
                    this.emitter.emit(`${target}:onreset`, data);
                  })
                  .catch(e => {
                    console.error(e);
                  })
              } else {
                this.emitter.emit(`${target}:onreset`);
              }
            }
            // 触发等于值相等事件
            this.emitter.emit(`${target}:onchange:${data}`);
          });
          break;
        // 切换是否可见
        case 'toggleVisible':
          this.setState((state) => {
            state.formConfig.fields.forEach((field) => {
              if (field.name === target) {
                field.visible = option.visible
              }
            });
            return state;
          });
          break;
        // 切换是否可编辑
        case 'toggleDisabled':
          this.setState((state) => {
            state.formConfig.fields.forEach((field) => {
              if (field.name === target) {
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
     * @param {*} { field, handler }
     * @memberof EmitterWrapper
     */
    handleDepend({ field, handler }) {
      const handlerParts = handler.split(':');
      const handlerName = handlerParts[0];
      // const handleParams = handlerParts.slice(1);
      switch (handlerName) {
        case 'reset':
          this.emitter.emit(`${field}:change`, undefined, { reset: true });
          break;
        case 'show':
        case 'hide':
          this.emitter.emit(`${field}:toggleVisible`, handlerName === 'show');
          break;
        case 'disable':
        case 'enable':
          this.emitter.emit(`${field}:toggleDisabled`, handleParams == 'disable');
          break;
      }
    }

    render() {
      const { formData, formConfig} = this.state;
      const { formContext } = this.props;
      return <Comp
        onCreate={this.props.onCreate}
        emitter={this.emitter}
        formConfig={formConfig}
        formData={formData}
        formContext={formContext}
        />;
    }
  }
  return EmitterWrapper;
}