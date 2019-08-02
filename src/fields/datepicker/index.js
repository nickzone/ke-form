import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default class FieldDatePicker extends Component {
  render() {
    const { disabled = false, placeholder, self = {}} = this.props.config;
    const { value, onChange } = this.props;

    return (
      <DatePicker
        {...self}
        disabled={disabled}
        placeholder={placeholder}
        value={value ? moment(value, 'YYYY-MM-DD'): null}
        format={'YYYY-MM-DD'}
        onChange={(date, dateString) => onChange(dateString)} />
    )
  }
}

FieldDatePicker.initialValue = "";