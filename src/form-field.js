import React, { Component } from 'react'
import { Form } from 'antd';
import { log } from './utils';
import { getField } from './fields';

export const fieldTypes = {};

export default class FormField extends Component {
  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    const { config, emitter } = this.props;
    // 如果字段实现了onReset接口，则需要注册onreset回调
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