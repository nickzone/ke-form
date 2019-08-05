import React from 'react'
import { render } from 'react-dom';
import KeForm from '../src';
//表单配置
const formConfig = {
  groups: [{ // 分组配置
    name: 'base',
    title: '基本信息'
  },{
      name: 'other',
      title: '其他信息'
  }],
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
  },
  ajax: (url) => new Promise((resolve,reject) => {
    console.log('获取远程数据',url)
    resolve([{key: 1, value: '北京'}])
  }),
  fields: [{ // 字段配置
    type: 'input', // 组件类型
    name: 'firstname', // 字段属性名
    placeholder: "请输入",
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
    placeholder: '当姓氏发生改变时且值不为空重置',
    dependEvents: [{
      target: 'firstname',
      type: 'change',
      handler: 'reset'
    }],
    remote: {
      url: 'http://xxxx?firstname=${firstname}&ucid=${context.ucid}',
      dependFields: ["firstname"]
    },
    group: 'other' // 所属分组
    }, { // 字段配置
      type: 'select', // 组件类型
      name: 'area', // 字段属性名
      label: '区域', // 字段标签
      rules: [{ required: true, message: '请填写!' }], // 校验规则
      // placeholder: '当城市改变时重置',
      dependEvents: [{
        target: 'city',
        type: 'change',
        handler: 'reset'
      }],
      remote: {
        url: 'http://xxxx?firstname=${city}&ucid=${context.ucid}',
        dependFields: ["city"]
      },
      group: 'other' // 所属分组
    }, { // 字段配置
      type: 'datepicker', // 组件类型
      name: 'datepicker', // 字段属性名
      label: '日期', // 字段标签
      group: 'other' // 所属分组
    }, { // 字段配置
      type: 'checkbox', // 组件类型
      name: 'checkbox', // 字段属性名
      label: '性别', // 字段标签
      options: [{key: '1', value: '男'}, {key: '0', value: '女'}],
      group: 'other' // 所属分组
    }, { // 字段配置
      type: 'radio', // 组件类型
      name: 'radio', // 字段属性名
      label: '分类', // 字段标签
      options: [{ key: '1', value: '分类1' }, { key: '0', value: '分类2' }],
      group: 'other' // 所属分组
    }, { // 字段配置
      type: 'switch', // 组件类型
      name: 'switch', // 字段属性名
      label: '启用', // 字段标签
      group: 'other' // 所属分组
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

  function setResult(form){
    form.onFieldsChange((changedFields, allFields) => {
      console.log('onFieldsChange',changedFields, allFields);
    });
    form.onValuesChange((changedValues, allValues) => {
      console.log('onValuesChange', changedValues, allValues);
    });

    window.__form = form; setInterval(() => {
      document.querySelector('#result').innerHTML = JSON.stringify(form.getFieldsValue(), null, 4);
    }, 500); 
  }

