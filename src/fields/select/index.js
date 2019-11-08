import React, { Component } from 'react';
import { Select } from 'antd';

export default class FieldSelect extends Component {
  render() {
    let {
      value,
      onChange,
      config: { disabled, props, options, name, placeholder, label }
    } = this.props;

    placeholder = placeholder || '请选择' + label;

    const _props = {
      placeholder,
      disabled,
      name,
      value,
      onChange,
      ...props
    }

    return (
      <Select {..._props}>
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