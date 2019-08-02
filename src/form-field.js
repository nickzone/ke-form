import React, { Component } from 'react'
import { Form } from 'antd';

export default class FormField extends Component {
  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    const { config, emitter } = this.props;
    // 绑定 resetOption 事件回调
    if (this.fieldRef.onReset) {
      emitter.on(`${config.name}:onreset`, this.onReset)
    }
  }

  onReset(data) {
    this.fieldRef.onReset.call(this.fieldRef,data);
  }

  bindRef(fieldRef) {
    this.fieldRef = fieldRef;
  }

  renderField() {
    const { config, form, labelCol, wrapperCol } = this.props;
    const { getFieldDecorator } = form;
    const type = config.type;
    const FieldComp = FormField[type] || null;

    if (!FieldComp) {
      return null;
    }

    return (
      <Form.Item
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        label={config.label} >
        {
          getFieldDecorator(config.name, {
            rules: config.rules || [],
            initialValue: FieldComp.initialValue || ''
          })(<FieldComp
            ref={this.bindRef.bind(this)}
            config={config}
            form={form} />
          )
        }
      </Form.Item>
    )
  }

  render() {
    return (
      <div>
        {this.renderField()}
      </div>
    );
  }

  componentWillUnmount() {
    const { config, emitter } = this.props;

    if (this.fieldRef.onReset) {
      emitter.off(`${config.name}:onreset`, this.onReset);
    }
  }
}

/**
 * 注册字段
 *
 * @export
 * @param {*} name 字段类型
 * @param {*} component 字段组件
 */
export function addField(name, component) {
  FormField[name] = FormField[name] || component;
}