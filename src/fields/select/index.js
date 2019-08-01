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
    if(data && remote) {
      this.setState({
        options: data
      })
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