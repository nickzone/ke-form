import React, { Component } from 'react';
import { Input } from 'antd';

export default class FieldInput extends Component {
  render() {
    const { disabled = false, placeholder, self = {} } = this.props.config;
    const { value, onChange } = this.props;

    return (
      <Input
        {...self}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    )
  }
}

FieldInput.initialValue = "";