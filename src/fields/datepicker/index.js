import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const defaultFormat = 'YYYY-MM-DD';

export default class FieldDatePicker extends Component {
  render() {
    let {
      value,
      onChange,
      config: { label, disabled, placeholder, props }
    } = this.props;

    placeholder = placeholder || '请选择' + label;

    const _props = {
      style: { width: '100%' },
      disabled,
      placeholder,
      value: value ? moment(value, props.format || defaultFormat) : null,
      onChange: (date, dateString) => { onChange(dateString) },
      format: defaultFormat,
      ...props
    }

    return (
      <DatePicker {..._props} />
    )
  }
}

FieldDatePicker.initialValue = "";