import React, { Component } from 'react'
import KeForm from '../../src';

//表单配置
const formConfig = {
  // 字段配置
  fields: [{
    label: '输入框',
    name: 'input'
  }, {
    label: '输入框2',
    name: 'input2',
    dependEvents: [{
      target: 'input',
      type: 'change:2'
    }]
  }]
};

export default class extends Component {
  render() {
    return (
      <KeForm
        formConfig={formConfig}
        onCreate={(form) => {
          form.onValuesChange((changedValues, allValues) => {
            console.log('changedValues', changedValues, 'allValues', allValues)
          })
        }}
      />
    )
  }
}