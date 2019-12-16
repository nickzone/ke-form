import React, { Component } from 'react';
import Emitter from 'component-emitter';
import FormAjax from './form-ajax';
import { getFieldByName, isEqualModel } from './utils';
import * as Fields from './fields';
import { DEFAULT_TYPE } from './form-field';
import FormUI from './form-ui'; // ui
import FormUIAdapter from './form-ui-adapter'; // ui适配器

export default function FormStore() {
  class EmitterWrapper extends Component {
    constructor(props) {
      super(props);
      this.formCompInstance = FormUIAdapter(FormUI); // 初始化表单实例
      this.emitter = new Emitter(); // 初始化事件管理对象
      this.form = null; // 可交互form实例
      this.state = {
        formData: this.normalizeFormData(), // 表单值
        formConfig: this.normalizeFormConfig() // 表单配置
      };
      this.setAjax();
    }


    // set ajax
    setAjax = () => {
      const ajax = this.props.formConfig.ajax;
      if (ajax) {
        FormAjax.setAjax(ajax);
      }
    }

    // 规范化配置
    normalizeFormConfig = () => {
      const { formConfig } = this.props;
      formConfig.fields.forEach((field) => {
        field.props = field.props || field.self || {};
        field.disabled = !!field.disabled;
      });
      return formConfig;
    }

    // 规范化formData
    normalizeFormData = () => {
      const normalLizedFormData = {};
      const { formConfig, formData } = this.props;

      formConfig.fields.forEach((field) => {
        const { name, type } = field;
        const initialValue = this.getFieldDefaultValue(type);
        normalLizedFormData[name] = (formData && formData[name]) || initialValue;
      });

      return normalLizedFormData;
    }

    // 获取所有字段
    getFields = () => {
      const { formConfig: { fields } } = this.props;
      return fields;
    }

    // 获取组件默认值
    getFieldDefaultValue = (type) => {
      return (Fields[type] || Fields[DEFAULT_TYPE]).initialValue;
    }

    // 初始化选项
    loadOptions = () => {
      // 遍历字段配置
      this.getFields().forEach((field) => {
        // 初始化remote数据
        this.loadRemote(field);
      });
    }

    // 初始化联动
    initDepends = () => {
      this.getFields().forEach(field => {
        this.triggerDepends(field.name, this.state.formData[field.name]);
      });
    }

    // 更新表单
    changeField = (name, value) => {
      const defaultValue = this.getFieldDefaultValue((getFieldByName(name, this.getFields()).type))
      this.setState((state) => {
        return {
          formData: {
            ...state.formData,
            [name]: value === undefined ?
              defaultValue : value
          }
        }
      }, () => {
        this.triggerDepends(name, value);
      });
    }

    // 触发联动
    triggerDepends = (_target, value) => {
      const fields = this.getFields();

      fields.forEach(field => {
        const { dependEvents, name } = field;
        if (dependEvents) {
          dependEvents.forEach(depend => {
            const { target, type = 'change', data, handle = 'reset' } = depend;
            // 判断是否满足联动条件
            if (target !== _target) { return; }
            if ('data' in depend && !isEqualModel(data, value)) { return; }
            if (type !== 'change') { return; }

            switch (handle) {
              case 'reset':
                this.loadRemote(field);
                this.changeField(name, this.getFieldDefaultValue(type));
                break;
              case 'show':
                this.loadRemote(field);
                this.form.setFieldsConfig({
                  [name]: {
                    visible: true
                  }
                });
                break;
              case 'hide':
                this.changeField(name, this.getFieldDefaultValue(type));
                this.form.setFieldsConfig({
                  [name]: {
                    visible: false
                  }
                });
                break;
              case 'disable':
              case 'enable':
                // BUG: 待修复
                this.form.setFieldsConfig({
                  [name]: {
                    disabled: handle === 'disable'
                  }
                });
            }
          })
        }
      });
    }

    /**
     * init remote data
     *
     * @param {*} field
     */
    loadRemote = (field) => {
      if (field.remote) {
        const { formData } = this.state;
        const { formContext } = this.props;

        FormAjax
          .getData({ formData, formContext, remote: field.remote })
          .then((data) => {
            this.form.setFieldsConfig({
              [field.name]: {
                options: data
              }
            });
          })
          .catch(e => {
            console.error(e);
          })
      }
    }

    /**
     * 返回表单实例
     *
     * @param {*} form
     */
    onCreate = (form) => {
      this.form = form;
      // mixin config setter && value-listener
      this.mixInFieldEvent(form);
      this.mixInConfigSetter(form);
      this.mixInVisibleSetter(form);
      this.mixInDisabledSetter(form);
      this.mixInRulesSetter(form);
      
      this.loadOptions(); // 加载字段选项
      this.initDepends(); // 初始化联动
      this.props.onCreate(form);
    }

    /**
     * mixin field listener
     *
     * @param {*} form
     * @memberof EmitterWrapper
     */
    mixInFieldEvent(form) {
      let { emitter } = this;

      form.onValuesChange = (callback) => {
        emitter.on('onValuesChange', callback);
      }

      form.onFieldsChange = (callback) => {
        emitter.on('onFieldsChange', callback);
      }
    }

    /**
     * mixin field setter
     *
     * @param {*} form
     * @memberof EmitterWrapper
     */
    mixInConfigSetter(form) {
      form.setFieldsConfig = this.makeConfigSetter();
    }

    /**
     * mixin field visible setter
     *
     * @param {*} form
     * @memberof EmitterWrapper
     */
    mixInVisibleSetter(form) {
      form.setFieldsVisible = this.makeConfigPropSetter(form, 'visible');
    }

    /**
     * mixin field disabled setter
     *
     * @param {*} form
     * @memberof EmitterWrapper
     */
    mixInDisabledSetter(form) {
      form.setFieldsDisabled = this.makeConfigPropSetter(form, 'disabled');
    }

    /**
     * mixin field rules setter
     *
     * @param {*} form
     * @memberof EmitterWrapper
     */
    mixInRulesSetter(form) {
      form.setFieldsRules = this.makeConfigPropSetter(form, 'rules')
    }

    /**
     * field special prop config setter builder
     *
     * @param {*} form
     * @param {*} prop
     * @returns
     * @memberof EmitterWrapper
     */
    makeConfigPropSetter(form, prop) {
      return (fields) => {
        for (const field in fields) {
          fields[field] = {
            [prop]: fields[field]
          };
        }
        form.setFieldsConfig(fields);
      };
    }

    /**
     * field config-setter builder
     *
     * @returns
     * @memberof EmitterWrapper
     */
    makeConfigSetter() {
      // 不可改属性配置
      const immutableProps = ['type', 'name', 'remote', 'dependEvents'];

      return (fields => {
        this.setState((state) => {
          state.formConfig.fields.forEach((field) => {
            const newField = fields[field.name];

            if (newField) {
              for (const prop in newField) {
                if (immutableProps.indexOf(prop) === -1) {
                  field[prop] = typeof newField[prop] === 'function' ?
                    newField[prop](field[prop]) : newField[prop];
                }
              }
            }
          });

          return state;
        });
      });
    }

    render() {
      const { formData, formConfig } = this.state;
      const { formContext, className } = this.props;
      return <this.formCompInstance
        formData={formData}
        formConfig={formConfig}
        formContext={formContext}
        className={className}
        changeField={this.changeField}
        onCreate={this.onCreate}
        emitter={this.emitter}
      />;
    }
  }
  return EmitterWrapper;
}