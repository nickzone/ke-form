import React, { Component } from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class FieldCheckbox extends Component {
  render() {
    let {
      value,
      onChange,
      config: { disabled, props, options, name }
    } = this.props;
 
    const _props = {
      disabled,
      name,
      value,
      onChange,
      ...props
    }

    return (
      <CheckboxGroup {..._props}>{
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