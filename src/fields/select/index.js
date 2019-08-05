import React, { Component } from 'react';
import { Select } from 'antd';

export default class FieldSelect extends Component {
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
        <Select.Option key={option.key}>
          {option.value}
        </Select.Option>
      );
    });
  }

  // 配置remote时返回远程数据
  onReset(data) {
    const { remote } = this.props.config;
    if(remote) {
      this.setState({
        options: data || []
      })
    }
  }

  render() {
    const { disabled = false, placeholder, self = {} } = this.props.config;
    const { value, onChange } = this.props;

    return (
      <Select
        placeholder={placeholder + 'dasdas'}
        disabled={disabled}
        value={value || undefined}
        onChange={onChange}
        {...self}>
        {this.renderOptions()}
      </Select>
    )
  }
}

FieldSelect.initialValue = "";