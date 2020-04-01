//app.js
import AJAX from './utils/ajax.js'
App({
  onLaunch: function () {
    wx.$AJAX = AJAX
    this.getPageinfo()
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 获取首页数据
  getPageinfo () {
    const that = this
    wx.$AJAX('/api/content/index', 'post').then(res => {
      if (res.statusCode === 200) {
          that.globalData.pageInfo = res.data.data.list
        }
    })
  },
  onError (e) {
    console.log(e)
  },
  globalData: { 
    // secret: b39bdfcc66cf3e7f8194aa388de6fa0a,
    pageInfo: null,
    isLogin: false,
    page: {
      "pageSize": "20",
      "currentPage": "1"
    }
  }
})