//app.js
import Util from './utils/util.js'
App({
  onLaunch: function () {
    this.getPageinfo()
  },
  // 获取首页数据
  getPageinfo () {
    const that = this
    wx.request({
      url: Util.base + '/api/content/index',
      data: Util.data,
      method: 'post',
      success(res) {
        if (res.statusCode === 200) {
          that.globalData.pageInfo = res.data.data.list
          console.log(res.data.data.list)
        }
      }
    })
  },
  globalData: { 
    pageInfo: null
  }
})