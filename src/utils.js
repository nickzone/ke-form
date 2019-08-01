// 获取字段配置
export function getFieldByName(name, fields){
  return fields.find((item) => item.name === name);
}