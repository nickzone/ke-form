import React from 'react'
import { render } from 'react-dom';
import KeForm from '../lib';
//表单配置
const formConfig = {
  groups: [{ // 分组配置
    name: 'base',
    title: '基本信息'
  }],
  fields: [{ // 字段配置
    type: 'input', // 组件类型
    name: 'firstname', // 字段属性名
    label: '姓氏', // 字段标签
    rules: [{ required: true, message: '请填写!' }], // 校验规则
    visible: true, // 是否展示
    disabled: false, // 是否可编辑
    placeholder: '请输入',
    group: 'base' // 所属分组
  }]
};

// 表单初始值，可选
const formData = {
  firstname: 'wang'
};

// 表单上下文，可选
const formContext = {
  ucid: '1000000000'
};

render(
  <KeForm
    formConfig={formConfig}
    formData={formData}
    formContext={formContext}
    onCreate={(form) => { console.log(form) }} // 表单创建后获取可交互实例
  />, document.body);