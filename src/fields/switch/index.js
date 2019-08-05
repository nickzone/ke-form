import React, { Component } from 'react';
import { Switch } from 'antd';

export default class FieldSwitch extends Component {
  render() {
    let { label, disabled = false, placeholder, self = {} } = this.props.config;
    const { value, onChange } = this.props;
    placeholder = placeholder || '请填写' + label;

    return (
      <Switch
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...self} />
    )
  }
}

FieldSwitch.initialValue = false;