let ajax = (url) => {
  console.error('[ke-form] A config of fromConfig.ajax is required to handle this request: ' , url);
}

function setAjax(_ajax) {
  ajax = _ajax;
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
        reject(e);
      })
  });
}

export default  { getData, setAjax }