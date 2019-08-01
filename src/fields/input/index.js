import React, { Component } from 'react';
import { Input } from 'antd';

export default class FieldInput extends Component {
  render() {
    const { disabled = false, placeholder } = this.props.config;

    return (
      <Input
        disabled={disabled}
        placeholder={placeholder}
        value={this.props.value}
        onChange={this.props.onChange} />
    )
  }
}
