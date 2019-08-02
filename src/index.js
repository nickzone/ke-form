import FormStore from './form-store'; // 业务容器
import FormUI from './form-ui'; // ui
import FormUIAdapter from './form-ui-adapter'; // ui适配器
import { addField } from './form-field';
import * as Fields from './fields';

const WrapperedForm = FormStore(FormUIAdapter(FormUI));

// 注册内置字段
for (const item in Fields) {
  plugin('field', item, Fields[item]);
}

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

export default WrapperedForm;
