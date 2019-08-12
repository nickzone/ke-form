// 获取字段配置
export function getFieldByName(name, fields){
  return fields.find((item) => item.name === name);
}

// 输出日志
export function log(type,msg) {
  console && console[type] && console[type]('[ke-form] ' + msg);
}