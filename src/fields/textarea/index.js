import React, { Component } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default class FieldTextArea extends Component {
  render() {
    let {
      value,
      onChange,
      config: { label, disabled, placeholder, props }
    } = this.props;

    placeholder = placeholder || '请输入' + label;

    const _props = {
      disabled,
      placeholder,
      value,
      onChange,
      ...props
    }

    return (
      <TextArea {..._props}/>
    )
  }
}

FieldTextArea.initialValue = "";