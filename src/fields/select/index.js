import React, { Component } from 'react';
import { Select } from 'antd';

export default class FieldSelect extends Component {
  renderOptions() {
    const { remote , options = []} = this.props.config;
    if (!remote){
      return options.map((option) => {
        return (
          <Select.Option key={option.key}>
            {option.value}
          </Select.Option>
        );
      });
    }
  }
  render() {
    const { disabled = false, placeholder } = this.props.config;
    return (
      <Select
        placeholder={placeholder}
        disabled={disabled}
        value={this.props.value}
        onChange={this.props.onChange}>
          {this.renderOptions()}
      </Select>
    )
  }
}