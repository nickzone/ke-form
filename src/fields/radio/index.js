import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class FieldRadio extends Component {
  render() {
    const { disabled = false, name, self = {}, options } = this.props.config;
    const { value, onChange } = this.props;

    return (
      <RadioGroup
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        {...self}
      >{options.map((option) => {
        return (
          <Radio key={option.key} value={option.key}>
            {option.value}
          </Radio>
        );
      })}</RadioGroup>
    )
  }
}

FieldRadio.initialValue = "";