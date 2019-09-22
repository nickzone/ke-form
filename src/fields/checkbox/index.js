import React, { Component } from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class FieldCheckbox extends Component {
  render() {
    const { disabled = false, name, self = {}, options} = this.props.config;
    const { value, onChange } = this.props;

    return (
      <CheckboxGroup
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        {...self}
      >{
          options.map((option) => {
            return (
              <Checkbox key={option.key} value={option.key}>
                {option.value}
              </Checkbox>
            );
          })
      }</CheckboxGroup>
    )
  }
}

FieldCheckbox.initialValue = [];