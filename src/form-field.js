import React, { Component } from 'react'
import { Form } from 'antd';
import { getField } from './fields';

export const fieldTypes = {};

export default class FormField extends Component {
  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    const { emitter } = this.props;
    emitter.on('reset', this.onReset);
  }

  onReset(resetName) {
    const { name } = this.props.config;
    if (resetName === name) {
      this.fieldRef.onReset && this.fieldRef.onReset();
    }
  }

  bindRef(fieldRef) {
    this.fieldRef = fieldRef;
  }

  renderField() {
    const { config, form, labelCol, wrapperCol, context } = this.props;
    const { getFieldDecorator } = form;
    const type = config.type;
    let FieldComp = getField(type);
    
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
            context={context}
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
    const { emitter } = this.props;
    emitter.off('reset', this.onReset);
  }
}