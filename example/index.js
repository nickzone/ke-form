import React from 'react'
import { render } from 'react-dom';
import KeForm from '../src';
//表单配置
const formConfig = {
  groups: [{ // 分组配置
    name: 'base',
    title: '基本信息'
  }],
  style: {
    itemCol: {
      span: 12
    },
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    }
  },
  fields: [{ // 字段配置
    type: 'input', // 组件类型
    name: 'firstname', // 字段属性名
    label: '姓氏', // 字段标签
    rules: [{ required: true, message: '请填写!' }], // 校验规则
    group: 'base' // 所属分组
  }, { // 字段配置
    type: 'input',
    name: 'lastname',
    label: '名字',
    group: 'base'
  }, { // 字段配置
    type: 'select', // 组件类型
    name: 'city', // 字段属性名
    label: '城市', // 字段标签
    rules: [{ required: true, message: '请填写!' }], // 校验规则
      placeholder: '当姓氏和名字都有值且姓氏发生改变时重置',
    dependEvents: [{
      target: 'firstname',
      type: 'change',
      handler: 'reset'
    }],
    remote: {
      url: 'http://xxxx?firstname=${firstname}&ucid=${context.ucid}',
      dependFields: ["lastname", "firstname"]
    },
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
    onCreate={(form) => { window.__form = form }} // 表单创建后获取可交互实例
  />, document.querySelector('#app'));

