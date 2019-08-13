import React, { Component } from 'react'
import KeForm from '../../src';

const formConfig = {
  fields: [{
    label: '姓名',
    name: 'firstname'
  }]
};

export default class extends Component {
  state = {
    formData: {}
  }

  onsubmit = () => {
    console.log(this.form.getFieldsValue())
  }

  onCreate = (form) => {
    this.form = form;
    form.onValuesChange((changedValues, allValues) => {
      console.log('changedValues', changedValues, 'allValues', allValues)
    })
  }

  render() {
    return (
      <div className="form-container">
        <div className="form-header">基本使用</div>
        <KeForm
          formConfig={formConfig}
          onCreate={this.onCreate}
        />
        <div className="form-submit-btn" onClick={this.onsubmit}>
          提交
        </div>
      </div>
    )
  }
}