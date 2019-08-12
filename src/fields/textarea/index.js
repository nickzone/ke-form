import React, { Component } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default class FieldTextArea extends Component {
  render() {
    let { label, disabled = false, placeholder, self = {} } = this.props.config;
    const { value, onChange } = this.props;
    placeholder = placeholder || '请输入' + label;

    return (
      <TextArea
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        {...self}/>
    )
  }
}

FieldTextArea.initialValue = "";