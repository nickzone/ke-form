import { Form } from 'antd';
import * as Fields from './fields';
import { DEFAULT_TYPE } from './form-field';

export default function (formUI) {
  const fieldStateMap = {};
  return Form.create({
    mapPropsToFields: (props) => {
      const { formConfig: { fields }, formData } = props;
      let map = {};
      let value = Fields[DEFAULT_TYPE].initialValue;

      fields.forEach((field) => {
        // 如是字段值为 undefined , 则设置为当前字段类型的初始值，
        // 如果字段类型不存在，则设置为默认类型的初始值
        if (formData[field.name] !== undefined) {
          value = formData[field.name]
        } else if (Fields[field.type]) {
          value = Fields[field.type].initialValue
        }

        map[field.name] = Form.createFormField({ 
          ...(fieldStateMap[field.name] || {}),
          value
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
        fieldStateMap[field] = { ...changedFields[field], value: undefined }
      });
      
      emitter.emit('onFieldsChange', changedFields, allFields);
    }
  })(formUI);
}