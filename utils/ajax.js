const CryptoJS = require('./crypto-js.js')
const base = 'http://183.6.177.163:9002' 
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}
const appSecret = 'secret1db14912688142aaac0dd701446dbb5a'
const baseURL = ''
const timeout = 10 * 1000
const generateDeviceId = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

/**
 * 参数序列化
 * return string
 */
function paramsSerialize(url, commonParams, reqParams, page) {
  let params = {
    ...reqParams,
    ...commonParams,
    ...page
  }
  let keys = Object.keys(params).sort()
  let str = ''
  keys.forEach((item) => {
    if (params[item] || params[item] === 0 || params[item] === '0') {
      if (typeof params[item] === 'object') {
        str += item + JSON.stringify(params[item])
      } else {
        str += item + params[item]
      }
    }
  })
  return baseURL + url + str + appSecret
}
const commonParams = {
  platform: 'Android',
  accessToken: '',
  version: '1.3.1',
  requestId: Math.random().toString(32).slice(2),
  deviceId: generateDeviceId(),
  appKey: 'key858ae80c9b7b4910b32a6d1c7b5248b3',
  channelCode: "0001",
  timestamp: +new Date(),
}
const AJAX = (url, method, data, page = {}) => {
  let strParams = paramsSerialize(url, commonParams, data, page)
  let mac = CryptoJS.HmacSHA256(strParams, appSecret)
  let sign = CryptoJS.enc.Base64.stringify(mac)
  sign = encodeURIComponent(sign)
  console.log('sign:', sign)
  let postParasm = {
    ...commonParams,
    sign,
    data,
    page
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: base + url,
      data: postParasm,
      method: method || 'post',
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}
export default AJAX