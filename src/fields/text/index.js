import React, { Component } from 'react';

export default class FieldText extends Component {
  
  render() {
    let {
      value,
      placeholder,
    } = this.props;

    return (
      <span>{value || placeholder || "--"}</span>
    )
  }
}

FieldText.initialValue = "";