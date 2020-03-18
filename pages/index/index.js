// index.js
// 获取应用实例
import URL from './url.js'
const app = getApp()
Page({
  data: {
    imageList: [],
    navList: [],
    noticeList: [],
    noticeIcon: '',
    infoList: [],
    productList: []
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
      },
      "notice": () => {
        this.setData({ noticeList: item.list, noticeIcon: item.image })
      },
      "product": () => {
        this.setData({ infoList: item.list })
        this.getProduct(item.list[0].groupId)
      }
    }
    info[item.areaCode] ? info[item.areaCode]() : false
  },
  // 获取商品数据
  getProduct (e) {
    let groupId
    if (typeof(e) !== 'object') {
      groupId = e
    } else {
      groupId = e.detail.id
    }
    const that = this
    const data = {
      "groupId": groupId,
      "viewCount": "50"
    }
    const page = {
      "pageSize": "20",
      "currentPage": "1"
    }
    const url = URL.getGroupProduct
    wx.$AJAX(url, 'post', data, page).then(res => {
      if (res.statusCode === 200) {
        that.setData({ productList: res.data.data.list })
        console.log(res.data.data.list)
      }
    })
  }
})
