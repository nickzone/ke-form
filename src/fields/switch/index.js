import React, { Component } from 'react';
import { Switch } from 'antd';

export default class FieldSwitch extends Component {
  render() {
    let {
      value,
      onChange,
      config: { disabled, props }
    } = this.props;

    const _props = {
      disabled,
      value,
      onChange,
      ...props
    }

    return (
      <Switch {..._props} />
    )
  }
}

FieldSwitch.initialValue = false;