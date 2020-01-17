import { default as input } from './input';
import { default as textarea } from './textarea';
import { default as select } from './select';
import { default as datepicker } from './datepicker';
import { default as checkbox } from './checkbox';
import { default as radio } from './radio';
import { default as _switch } from './switch';
import { default as text } from './text';

const fieldTypes = {
  input, textarea, select, datepicker, checkbox, radio, switch: _switch, text
};

/**
 * 获取字段信息
 *
 * @export
 * @param {*} type // 获取字段类型
 * @param {*} prop // 获取字段属性
 * @returns // 获取类型的字段或属性
 */
export function getField(type, prop) {
  let value = fieldTypes[type] || fieldTypes[DEFAULT_TYPE];
  if (prop) {
    value = value[prop]
  }
  return value;
}

/**
 * 注册字段
 *
 * @export
 * @param {*} name 字段类型
 * @param {*} component 字段组件
 */
export function addField(name, component, options = {}) {
  component.initialValue =  'initialValue' in options ? option.initialValue : '';
  fieldTypes[name] = fieldTypes[name] || component;
}

// 默认类型，没有配置type按input渲染
export const DEFAULT_TYPE = 'input';