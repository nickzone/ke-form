import React, { Component } from 'react'
import KeForm from 'plugin';
import { schema } from './schema';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      error: false,
      formConfig: schema
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.form.validateFieldsAndScroll((err, values) => {
      if(err) {
        console.log("验证不通过：", err)
        return
      }
      console.log("验证通过，当前表单值： ", values);
    });
  }

  onChange(e) {
    const val = e.target.value;
    this.setState({
      error: false
    });
    try {
      const next = JSON.parse(val);
      this.setState({
        formConfig: null
      }, () => {
        this.setState({
          formConfig: next
        });
      });
    } catch (e) {
      this.setState({
        error: true
      })
    }
  }
  
  render() {
    const { formConfig, error } = this.state;

    return (
      <div>
        <h3>表单解析结果</h3>
        {
          formConfig && !error ? <KeForm formConfig={formConfig} onCreate={(form) => { this.form = form }} /> : null
        }
        {
          error && 'JSON格式错误' 
        }
        <button onClick={this.onSubmit}>提交</button>
        <div>
          <h3>formConfig(表单配置JSON))</h3>
          <textarea defaultValue={JSON.stringify(formConfig, null, 4)} onChange={this.onChange} style={{width: '100%', height: 300}}/>
        </div>
      </div>
    )
  }
}
