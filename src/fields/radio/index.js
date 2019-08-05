import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class FieldRadio extends Component {
  constructor(props) {
    super(props);
    const { options = [] } = this.props.config;
    this.state = { options };
  }

  renderOptions() {
    const { options } = this.state;

    return options.map((option) => {
      return (
        <Radio key={option.key} value={option.key}>
          {option.value}
        </Radio>
      );
    });
  }

  render() {
    const { disabled = false, name, self = {} } = this.props.config;
    const { value, onChange } = this.props;

    return (
      <RadioGroup
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        {...self}
      >{this.renderOptions()}</RadioGroup>
    )
  }
}

FieldRadio.initialValue = "";