![npm](https://img.shields.io/npm/dm/ke-form?style=flat-square)
![npm](https://img.shields.io/npm/v/ke-form?style=flat-square)

## 说明

一个支持配置化的表单（支持表单字段分组）组件，适用以下场景：

* 想要快速使用 `配置（json）` 初始化一个支持多种内置字段类型的表单。

* 想要对表单字段进行 `分组` 展示和分别调整布局，设置分组标题。

* 想要通过配置（json）声明式定义一些简单的 `字段联动` 效果。

* 对于没有的字段，能够快速 `扩展` 自定义字段。

## 安装

```bash·
npm install ke-form
```

## 使用

```js
import React , { Component } from 'react';
import { render } from 'react-dom';
import KeForm from 'ke-form';

// 表单配置，包括字段、布局、分组等
const formConfig = {
    fields: [{ // fields
        type: 'input',
        name: 'firstname',
        label: 'First Name',
    }]
};

// 表单初始值
const formData={
    firstname: 'tom'
};

// 表单上下文
const formContext={ 
    ucid: '1000000000'
};

render(
    <KeForm
        formConfig={formConfig} // 表单配置，必传，生效一次
        formData={formData} // 表单初始值，可选
        formContext={formContext} // 表单上下文，可选
        onCreate={(form) => {console.log(form)}} // 获取可交互表单实例，用于获取表单值，修改配置等
    />, document.body);
```

## 示例

[codesandbox在线示例](https://codesandbox.io/s/solitary-voice-kjusg)

## API

### KeForm 组件实例

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| formConfig | 表单配置，包括字段、布局、分组等 | object | - |
| formData | 表单初始值，{字段名: 字段值} map格式 | object | - |
| formContext | 表单上下文，用于向表单传入额外的数据，可被表单部件，如字段部件访问 | object | - |
| onCreate | 表单创建回调函数，用于和表单进行交互，比如获取表单值 | (form) => void | - |

### formConfig 表单配置

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| style | 表单布局,默认纵向布局,详细配置见后文 | object | - |
| groups | 表单分组，当表单字段非常多，需要通过分组展示时适用 | array | - |
| fields | 表单字段，详见后文 | array | [] |
| ajax | 数据加载函数，供内部组件需要获取数据依赖时调用 | (url) => promise.then(data) | - |

### formConfig.style 表单样式

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| itemCol | 表单栅格布局，同 [Antd.Col](https://ant.design/components/grid-cn/#Col) | object | - | 
| labelCol | 标签栅格布局，同 [Antd.Form](https://ant.design/components/form-cn/#API) | object | - |
| wrapperCol | 表单元素栅格布局，同 [Antd.Form](https://ant.design/components/form-cn/#API) | object | - |

### formConfig.groups[i] 表单分组

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| name | 分组key，必填 | string | - |
| title | 分组标题 | string | '' |
| style | 分组样式,继承并覆盖上文 `formConfig.style` 配置 | object | - |

### formConfig.fields[i] 表单元素

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| group | 分组key，当配置了分组时适用，表明字段所在分组 | string | - |
| type | 字段类型，每种表单字段对应一种type,详见下文 | string | 'input' | 
| name | 字段键值 | string | - | 
| label | 字段label | string | '' | 
| visible | 字段是否可见 | boolean | true | 
| disabled | 字段是否可编辑 | boolean | false |
| props || self(旧) | antd 原生组件属性,注意不要设置和 value 相关的属性，可能引起异常 | object | - |  
| rules | 字段验证规则，配置同 [Ant.Form](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) | array | - |
| placeholder | 字段提示占位符 | string | 组件提供默认值，类似 "请填入 label" |
| style | 字段布局，继承并覆盖 上文 `formConfig.style` 和 `formConfig.group[i].style` 配置,实现更细粒度的样式控制 | object | - |
| remote | 字段远程数据加载，比如某些字段需要根据其他字段动态加载选项 | object: `{url:string,dependFields:array}` | - |
| remote.url | 字段数据加载url，支持模版语法,${a}表示取字段 name === a 的当前值, ${context.a} 表示取传入 formContext.a 的值| string: `/getOptions?field1=${field1}&ucid=${context.ucid}` | '' |
| remote.dependFields | 数据依赖，当form初始化和字段重置时，根据该依赖决定是否加载新的选项数据 | array: ["field1","field2"] | [] |
| dependEvents | 字段联动配置，基于事件模型实现，描述监听目标字段发生值改变时，当前字段如何联动改变 | array: [{target, type, handler}] | - |
| dependEvents[i].target | 所监听目标字段key值 | string | '' |
| dependEvents[i].type | 所监听目标字段值值改变类型 | string: `change` (值改变) , `change:someValue` (等于特定值) | 'change' |
| dependEvents[i].handler | 触发当前字段回调事件 | string: `reset` (重置) ,  `show / hide` (切换显示隐藏), `disable / enable` (切换可编辑) | 'reset' |

## formConfig.fields[i].type 表单元素类型

对于每种字段类型，除了支持上述公共 Api ,因为字段本身是基于 antd 表单组件实现的，所以能够支持相应属性，需通过 `props` 配置属性传入, 不要传入 `value` 和 `onChange` 等与表单值有关的属性，会引起状态管理异常。

### text 纯文本

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| props | - | object  | - |

### input 文本框

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| props | 可传入 [Antd.Input](https://ant.design/components/input-cn/#Input) 原生属性 | object  | - |

### textarea 多行文本框

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| props | 可传入 [Antd.Input.TextArea](https://ant.design/components/input-cn/#Input.TextArea) 原生属性 | object  | - |

### select 选择器

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| options | 选项 | array: [{key: value}] | - |
| props | 可传入 [Antd.Select](https://ant.design/components/select-cn/#Select-props) 原生属性 | object  | - |

### datepicker  日期选择器

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| props | 可传入 [Antd.DatePicker](https://ant.design/components/date-picker-cn/#%E5%85%B1%E5%90%8C%E7%9A%84-API) 原生属性 | object | - |

### checkbox 多选框

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| options | 选项 | array: [{key: value}] | - |
| props | 可传入 [Antd.Checkbox.Group](https://ant.design/components/checkbox-cn/#Checkbox-Group) 原生属性 | object  | - |

### radio 单选框

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| options | 选项 | array: [{key: value}] | - |
| props | 可传入 [Antd.Radio.Group](https://ant.design/components/radio-cn/#RadioGroup) 原生属性 | object  | - |

### switch 开关

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| props | 可传入 [Antd.Switch](https://ant.design/components/switch-cn/#API) 原生属性 | object  | - |

### formConfig.ajax

配置内部组件加载数据用到的ajax函数,需适配如下语法:
  
```js
formConfig.ajax(url).then(data); // data 是转化后的最终数据,这些数据会被内部组件应用
```

### formData 表单初始值

用于填写默认值, `{key:value}` 格式。

```js
{
    field_name: 'field_value',
    // ...
}
```

### onCreate(form) 表单回调函数

> 原理：在底层实现上，回调参数 `form` 为 `antd` `Form.create` 方法创建表单得到的内部
  [this.props.form](https://ant.design/components/form-cn/#Form.create(options)) 对象，
  本组件对其方法进行了扩展,以支持更多交互，扩展参数有：

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |
| onValuesChange | 任一表单域的值发生改变时的回调，是对 `Form.create({onValuesChange})` 的封装，去掉第一个回调参数 | (changedValues, allValues) => void |
| onFieldsChange | 当字段值（包括 error）发生改变时触发，是对 `Form.create({onFieldsChange})` 的封装，去掉第一个回调参数 | (changedFields, allFields) => void |
| setFieldsVisible | 修改字段的可见性 | ({fieldname: visible:boolean `or` (current) => boolean})|
| setFieldsDisabled | 修改字段的可编辑性 | ({fieldname: disabled:boolean `or` (current) => boolean})|
| setFieldsRules | 修改字段的校验规则 | ({fieldname: rules:array `or` (current) => array}) |
| setFieldsConfig | 批量修改字段的配置属性('type', 'name', 'remote', 'dependEvents' 不支持修改) | ({[fieldName]: {[prop: newValue or (oldValue) => value  ]}})|

### formContext 表单业务上下文数据

> 上下文数据对象，可被表单内部组件访问，比如一些字段需要远程数据，
  其配置的url属性能够通过 `http://${context.userid}` 的方式动态填充 `formContext.userid` 数据。

## Q&A

### 对于不支持的字段，如何快速扩展？

提供方法 `plugin('field','fieldType', Component)` 扩展字段，事实上内置字段也是通过该方法进行扩展的。

扩展字段可访问组件内部的方法，并需要实现指定接口，比如内置 `input` 类型的实现如下：

```js
// ====== input.js ======
import React, { Component } from 'react';
import { Input } from 'antd';

export default class FieldInput extends Component {
  render() {
    // `this.props.config` 获取当前字段配置对象 
    // `this.props.value`, `this.props.onChange` 实现数据双向绑定
    // `this.props.form` 能够获取当前表单对象实例 ,从而向上与整个表单互动
    // `this.props.context` 能够获取当前表单上下文数据对象  
    let {
      value, 
      onChange, 
      config: { label, disabled, placeholder, props } 
    } = this.props;

    placeholder = placeholder || '请输入' + label;

    const _props = {
      disabled,
      placeholder,
      value,
      onChange,
      ...props
    }

    return (
      <Input {..._props}/>
    )
  }
}
// 设定默认值
FieldInput.initialValue = "";
// ====== / input.js ======


// ===== index.js ======
import React, { Component } from 'react';
import render from 'react-dom';
import Keform , { plugin } from 'ke-form';
import Input from './input.js';

// 注册 input 类型
plugin('field', 'input', Input);

export default class App extends Component{
  render () {
    return  <Keform formConfig={{fields: [{type: ‘input’, name: 'fristname'}]}}/>
  }
}
// ===== /index.js ======
```