const _formEncode = obj => Object.entries(obj)
  .filter(v => ![null, undefined, ''].includes(v[1]))
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  .join('&')

export default data => {
  const { url, params, onSuccess, onError } = data

  let xhr = new XMLHttpRequest()
  xhr.open('POST', `/index.php/waterworld/${url}`)
  xhr.timeout = 10000
  xhr.onloadend = () => {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      let data = JSON.parse(xhr.responseText)
      if (data.errcode === 0) {
        onSuccess(data)
      } else {
        onError(data)
      }
    } else {
      console.error('statusError: form @/script/ajax.js')
    }
  }

  try {
    xhr.send(_formEncode(params))
  } catch (e) {
    console.log(e.message)
  }
}
