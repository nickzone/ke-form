import FormStore from './form-store';
import { addField } from './fields'; 

/**
 * 提供插件扩展方法
 *
 * @export
 * @param {*} type 插件类型
 * @param {*} rest 插件注册参数
 */
export function plugin(type, ...rest) {
  switch (type) {
    // 扩展字段
    case 'field':
      addField(...rest);
  }
}

export default FormStore;
