import React from 'react'
import { render } from 'react-dom';
import KeForm from '../src';
//表单配置
const formConfig = {
  // 分组配置
  groups: [{
    name: 'base-use',
    title: <div>$基本使用 <small> 一个文本输入框</small></div>,
  }, {
    name: 'common-use',
    title: <div>$完整表单 <small>一个纵向排列表单</small></div>,
    style: {
      itemCol: {
        span: 6
      },
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  }, {
    name: 'other',
    title: '其他信息'
  }],
  // 样式配置
  style: {},
  // 远程数据
  ajax: (url) => new Promise((resolve, reject) => {
    console.log('获取远程数据', url)
    resolve([{ key: 1, value: '北京' }])
  }),
  // 字段配置
  fields: [{
    type: 'input',
    label: '姓氏',
    name: 'input-base',
    group: 'base-use'
  }, {
    type: 'input', // 组件类型
    name: 'firstname', // 字段属性名
    placeholder: "请输入",
    label: '姓氏', // 字段标签
    rules: [{ required: true, message: '请输入!' }], // 校验规则
    group: 'common-use'
  }, {
    type: 'input',
    name: 'lastname',
    label: '名字',
    group: 'common-use'
  }, {
    type: 'select', // 选择框
    name: 'city',
    label: '城市',
    rules: [{ required: true, message: '请输入!' }],
    remote: {
      url: 'http://xxxx?firstname=${firstname}&ucid=${context.ucid}',
      dependFields: ["firstname"]
    },
    group: 'other'
  }, {
    type: 'select',
    name: 'area',
    label: '区域',
    rules: [{ required: true, message: '请输入!' }],
    dependEvents: [{
      target: 'city',
      type: 'change',
      handler: 'reset'
    }],
    remote: {
      url: 'http://xxxx?firstname=${city}&ucid=${context.ucid}',
      dependFields: ["city"]
    },
    group: 'other'
  }, {
    type: 'datepicker', // 日期选择
    name: 'datepicker',
    label: '日期',
    group: 'other'
  }, {
    type: 'checkbox', // 多选框
    name: 'checkbox',
    label: '性别',
    options: [{ key: '1', value: '男' }, { key: '0', value: '女' }],
    group: 'other'
  }, {
    type: 'radio', // 单选框
    name: 'radio',
    label: '分类',
    options: [{ key: '1', value: '分类1' }, { key: '0', value: '分类2' }],
    group: 'other'
  }, {
    type: 'switch', // 开关
    name: 'switch',
    label: '启用',
    group: 'other'
  }, {
    type: 'textarea', // 文本框
    name: 'textarea',
    label: '文本框',
    group: 'other'
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
    onCreate={setResult} // 表单创建后获取可交互实例
  />, document.querySelector('#app'));

function setResult(form) {
  form.onFieldsChange((changedFields, allFields) => {
    console.log('onFieldsChange', changedFields, allFields);
  });
  form.onValuesChange((changedValues, allValues) => {
    console.log('onValuesChange', changedValues, allValues);
  });

  window.__form = form; setInterval(() => {
    document.querySelector('#result').innerHTML = JSON.stringify(form.getFieldsValue(), null, 4);
  }, 500);
}
