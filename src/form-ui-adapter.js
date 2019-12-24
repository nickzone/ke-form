import { Form } from 'antd';
import { getField, DEFAULT_TYPE } from './fields';

export default function (formUI) {
  const fieldStateMap = {}; // 缓存表单数据
  return Form.create({
    mapPropsToFields: (props) => {
      const { formConfig: { fields }, formData } = props;
      let map = {};

      fields.forEach((field) => {
        let value = getField(DEFAULT_TYPE, 'initialValue');

        if (formData[field.name] !== undefined) {
          value = formData[field.name];
        } else if ('initialValue' in field) {
          value = field.initialValue;
        } else if (getField([field.type])) {
          value = getField(field.type, 'initialValue');
        }

        map[field.name] = Form.createFormField({ 
          ...(fieldStateMap[field.name] || {}),
          value
        });
      });

      return map;
    },
    onValuesChange: (props, changedValue, allValues) => {
      const { emitter } = props;

      emitter.emit('onValuesChange', changedValue, allValues);
    },
    onFieldsChange: (props, changedFields, allFields) => {
      const { emitter, changeField } = props;
      const fields = Object.keys(changedFields);

      emitter.emit('onFieldsChange', changedFields, allFields);
      
      fields.forEach((field) => { // 更新表单状态
        changeField(field, changedFields[field].value);
        fieldStateMap[field] = { ...changedFields[field], value: undefined }
      });
    }
  })(formUI);
}