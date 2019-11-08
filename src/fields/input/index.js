import React, { Component } from 'react';
import { Input } from 'antd';

export default class FieldInput extends Component {
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
      <Input {..._props}/>
    )
  }
}

FieldInput.initialValue = "";