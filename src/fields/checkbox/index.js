import React, { Component } from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class FieldCheckbox extends Component {
  constructor(props) {
    super(props);
    const { options = [] } = this.props.config;
    this.state = {
      options
    }
  }

  renderOptions() {
    const { options } = this.state;

    return options.map((option) => {
      return (
        <Checkbox key={option.key} value={option.key}>
          {option.value}
        </Checkbox>
      );
    });
  }
  
  render() {
    const { disabled = false, name } = this.props.config;
    const { value, onChange } = this.props;

    return (
      <CheckboxGroup
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
      >{this.renderOptions()}</CheckboxGroup>
    )
  }
}

FieldCheckbox.initialValue = [];