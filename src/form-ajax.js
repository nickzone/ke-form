import axios from 'axios'
// let ajax = (url) => {
//   return axios({
//     method: 'get',
//     url
//   }).then(data => {
//     return data;
//   })
// }

let ajax = (url) => {
  console.log('发起remote请求：', url)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{"key": "100001","value": "北京"}])
    }, 2000);
  })
}

function getData({ formData, formContext, remote }) {
  return new Promise((resolve, reject) => {
    const { dependFields, url } = remote;

    if (dependFields && dependFields.length > 0) {
      if (dependFields.some((item) => !formData[item])) {
        resolve(null);
        return;
      }
    }

    // 使用上下文和表单值填充url模版
    const parsedUrl = url.replace(/\$\{(.+?)\}/g, function ($0, $1) {
      const splits = $1.split('.');
      if (splits[0] === 'context') {
        return formContext[splits[1]]
      }
      return formData[$1];
    });
    ajax(parsedUrl)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        console.log(e);
        resolve(null);
      })
  });
}

export default { getData }