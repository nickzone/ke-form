// 获取字段配置
export function getFieldByName(name, fields){
  return fields.find((item) => item.name === name);
}

// 输出日志
export function log(type,msg) {
  console && console[type] && console[type]('[ke-form] ' + msg);
}

// 判断两个数据相等
export function isEqualModel(a, b) {
  if(a === b) { // 原始类型
    return true;
  }

  try { // 对象类型
    const _a = JSON.stringify(a);
    const _b = JSON.stringify(b);
    return _a === _b;
  } catch(e) {
    return false;
  }
}