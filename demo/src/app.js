import React, { Component } from 'react'
import KeForm from '@ke/ke-form';
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
    this.onReset = this.onReset.bind(this);
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

  onReset() {
    this.form.resetFields();
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

  componentDidMount() {
    this.form.onValuesChange((value)=>{
      console.log("更改了；", value);
    })
  }
  
  render() {
    const { formConfig, error } = this.state;

    return (
      <div>
        <div>
          <h3>表单配置 (props.formConfig))</h3>
          <textarea defaultValue={JSON.stringify(formConfig, null, 4)} onChange={this.onChange} style={{ width: '100%', height: 300 }} />
        </div>
        <div>
          <h3>配置解析结果</h3>
          {
            formConfig && !error ? <KeForm className="custom-class" formConfig={formConfig} onCreate={(form) => { this.form = form }} /> : null
          }
          {
            error && 'JSON格式错误'
          }
        </div>
        <button onClick={this.onSubmit}>提交</button>
        <button onClick={this.onReset}>重置</button>
      </div>
    )
  }
}
