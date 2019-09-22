import React, { Component } from 'react';

export default class FieldText extends Component {
  render() {
    const { value } = this.props;

    return (
      <span>{value || "--"}</span>
    )
  }
}

FieldText.initialValue = "";