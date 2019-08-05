import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default class FieldDatePicker extends Component {
  render() {
    const { disabled = false, placeholder, self = {}} = this.props.config;
    const { value, onChange } = this.props;
    const defaultFormat = 'YYYY-MM-DD';

    return (
      <DatePicker
        style={{width: '100%'}}
        disabled={disabled}
        placeholder={placeholder}
        value={value ? moment(value, self.format || defaultFormat) : null}
        onChange={(date, dateString) => { onChange(dateString) }}
        format={defaultFormat}
        {...self}/>
    )
  }
}

FieldDatePicker.initialValue = "";