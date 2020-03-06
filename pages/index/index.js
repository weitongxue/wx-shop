//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageList: [],
    navList: []
  },
  onReady: function () {
    const pageInfo = app.globalData.pageInfo || []
    pageInfo.map(item => {
      this.getInfo(item)
    })
  },
  // 获取对应数据
  getInfo(item) {
    const info = {
      'banner': () => {
        this.setData({ imageList: item.list })
      },
      'navigation': () => {
        this.setData({ navList: item.list })
      }
    }
    info[item.areaCode] ? info[item.areaCode]() : false
  }
})
