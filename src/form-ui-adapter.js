import { Form } from 'antd';

export default function (formUI) {
  return Form.create({
    mapPropsToFields: (props) => {
      const { formStore: { fields, data}} = props;
      let map = {};
      // 遍历字段配置，如果字段有值，填入值
      // 如果字段无值，填入默认值
      fields.forEach((field)=> {
        map[field.name] = Form.createFormField({
          value: data[field.name] || field.defaultValue
        })
      });
      return map;
    },
    onValuesChange: (props, changedValue) => {
      const { formStore: { emitter } } = props;
      const fields = Object.keys(changedValue);
      
      fields.forEach((field)=>{
        emitter.emit(`${field}:changeValue`, changedValue[field]);
      });
    }
  })(formUI);
}