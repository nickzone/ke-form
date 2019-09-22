import React, { Component } from 'react';
import { Select } from 'antd';

export default class FieldSelect extends Component {
  render() {
    let { label, disabled = false, placeholder, self = {}, options } = this.props.config;
    const { value, onChange } = this.props;
    placeholder = placeholder || '请选择' + label;

    return (
      <Select
        placeholder={placeholder}
        disabled={disabled}
        value={value || undefined}
        onChange={onChange}
        {...self}>
        {options.map((option) => {
          return (
            <Select.Option key={option.key}>
              {option.value}
            </Select.Option>
          );
        })}
      </Select>
    )
  }
}

FieldSelect.initialValue = "";