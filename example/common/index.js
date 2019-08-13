import React, { Component } from 'react'
import KeForm from '../../src';

const formConfig = {
  fields: [{
    type: 'input',
    label: '姓氏',
    name: 'firstname'
  }, {
    type: 'input',
    label: "名称",
    name: 'lastname',
    dependEvents:[{
      target: 'firstname'
    }]
  }, {
    type: 'select', // 选择框
    name: 'city',
    label: '城市',
    options: [{ key: 'beijing', value: '北京' }, { key: 'shanghai', value: '上海' }]
  }, {
    type: 'datepicker', // 日期选择
    name: 'date',
    label: '日期'
  }, {
    type: 'radio', // 多选框
    name: 'sex',
    label: '性别',
    options: [{ key: '0', value: '男' }, { key: '1', value: '女' }],
  }, {
    type: 'checkbox', // 单选框
    name: 'aihao',
    label: '爱好',
    options: [{ key: 'football', value: '足球' }, { key: 'basketball', value: '篮球' }]
  }, {
    type: 'switch', // 开关
    name: 'active',
    label: '启用'
  }, {
    type: 'textarea', // 文本框
    name: 'intro',
    label: '自我介绍'
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
        <div className="form-header">支持各种类型的字段</div>
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