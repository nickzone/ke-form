import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class FieldRadio extends Component {
  render() {
    let {
      value,
      onChange,
      config: { disabled, props, options, name }
    } = this.props;

    const _props = {
      disabled,
      value,
      onChange,
      name,
      ...props
    }

    return (
      <RadioGroup {..._props} >{options.map((option) => {
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