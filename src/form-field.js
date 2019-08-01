import React, { Component } from 'react'
import { Form } from 'antd';
import * as Fields from './fields';

export default class FormField extends Component {
  constructor(props) {
    super(props);
    this.onResetValue = this.onResetValue.bind(this);
  }

  // 注册类型组件
  static addField(name, component) {
    FormField[name] = FormField[name] || component;
  }

  componentDidMount() {
    const { field } = this.props;
    // 绑定 resetOption 事件回调
    if (this.fieldRef.onResetValue) {
      this.props.formStore.emitter.on(`${field.name}:onResetValue`, this.onResetValue)
    }
  }

  onResetValue() {
    this.fieldRef.onResetValue.call(this.fieldRef);
  }

  bindRef(fieldRef) {
    this.fieldRef = fieldRef;
  }

  renderField() {
    const { field, formStore, form: { getFieldDecorator }, labelCol, wrapperCol } = this.props;
    const type = field.type;
    const FieldComp = FormField[type] || null;
    if (!FieldComp) {
      return null;
    }
    return (
      <Form.Item
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        label={field.label} >
        {
          getFieldDecorator(field.name, {
            rules: field.rules || []
          })(<FieldComp ref={this.bindRef.bind(this)} config={field} formStore={formStore} />)
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
    const { field } = this.props;

    if (this.fieldRef.onResetValue) {
      this.props.formStore.emitter.off(`${field.name}:onResetValue`, this.onResetValue);
    }
  }
}

for (const item in Fields) {
  FormField.addField(item, Fields[item])
}