import { Form } from 'antd';
import * as Fields from './fields';
export default function (formUI) {
  return Form.create({
    mapPropsToFields: (props) => {
      const { formConfig: { fields }, formData } = props;
      let map = {};
      // 遍历字段配置，如果字段有值，填入值
      // 如果字段无值，填入默认值
      fields.forEach((field)=> {
        map[field.name] = Form.createFormField({
          value: formData[field.name] || Fields[field.type].initialValue
        })
      });
      return map;
    },
    onValuesChange: (props, changedValue, allValues) => {
      const { emitter } = props;
      
      emitter.emit('onValuesChange', changedValue, allValues);
    },
    onFieldsChange: (props, changedFields, allFields) => {
      const { emitter } = props;
      const fields = Object.keys(changedFields);

      fields.forEach((field) => {
        emitter.emit(`${field}:change`, changedFields[field].value);
      });
      emitter.emit('onFieldsChange', changedFields, allFields);
    }
  })(formUI);
}