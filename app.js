//app.js
import AJAX from './utils/ajax.js'
App({
  onLaunch: function () {
    this.getPageinfo()
    wx.$AJAX = AJAX
  },
  // 获取首页数据
  getPageinfo () {
    const that = this
    AJAX('/api/content/index', 'post').then(res => {
      if (res.statusCode === 200) {
          that.globalData.pageInfo = res.data.data.list
          console.log(res.data.data.list)
        }
    })
  },
  globalData: { 
    pageInfo: null,
    page: {
      "pageSize": "20",
      "currentPage": "1"
    }
  }
})