// index.js
// 获取应用实例
import URL from './url.js'
import Util from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    logoImg: '',
    backColor: '',
    pageKey: [],
    imageList: [],
    navList: [],
    noticeList: [],
    noticeIcon: '',
    infoList: [],
    productList: [],
    currentGroupId: '',
    isNoMore: false,
    pages: ''
  },
  onReady: function () {
    const pageInfo = app.globalData.pageInfo || []
    const pageKeyList = []
    pageInfo.map(item => {
      this.getInfo(item)
      pageKeyList.push(item.areaCode)
    })
    this.setData({ pageKey: pageKeyList })
  },
  onShareAppMessage() {
    return {
      title: "我的小程序", // 默认是小程序的名称(可以写slogan等)
      imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success (res) {
        cosnole.log(res)
      }
    }
  },
  onReachBottom() {
    const { currentGroupId, pages, isNoMore } = this.data
    const That = this
    let currentPage = app.globalData.page.currentPage
    currentPage++
    app.globalData.page.currentPage = currentPage
    if (currentPage <= pages) {
      Util.handleShake(That.getProduct(currentGroupId, 'scroll'), 1000)
    } else {
      this.setData({ isNoMore: true })
    }
  },
  // 获取对应数据
  getInfo(item) {
    const info = {
      'logo': () => {
        this.setData({ logoImg: item.logoImg, backColor: item.backColor })
      },
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
        const LIST = new Array
        item.list.map(() => {
          LIST.push({})
        })
        this.setData({ infoList: item.list, productList: LIST })
        this.getProduct(item.list[0].groupId, 'click')
      }
    }
    info[item.areaCode] ? info[item.areaCode]() : false
  },
  // 获取商品数据
  getProduct (e, type) {
    wx.showLoading({
      title: '数据加载中...',
    })
    let groupId
    if (typeof(e) !== 'object') {
      groupId = e
    } else {
      groupId = e.detail.id
    }
    this.setData({ currentGroupId: groupId, isNoMore: false })
    const that = this
    const data = {
      "groupId": groupId,
      "viewCount": "50"
    }
    const url = URL.getGroupProduct
    const page = app.globalData.page
    const { productList }= this.data
    wx.$AJAX(url, 'post', data, page).then(res => {
      if (res.statusCode === 200) {
        wx.hideLoading()
        if (!res.data.data.list.length) {
          this.setData({ isNoMore: true })
        } else {
          let list = this.newList(groupId, res.data.data.list, type)
          that.setData({ productList: list, pages: res.data.data.pages })
          console.log(list)
        }
      }
    })
  },
  // 数据结构改造 (key: 分类id, data：分类的数据)
  newList(key, data, type) {
    const { infoList, productList } = this.data
    let obj = Object.assign({}, { key, data })
    let newArr = new Array()
    if (type === 'scroll') {
      // 滚动加载数据
      productList.map(item => {
        if (item.key === key) {
          item.data.push(...data)
        }
      })
    } else {
      // 点击跳转
      infoList.map((item, index) => {
        if (item.groupId === key) {
          productList[index] = obj
        }
      })
    }
    return productList
  }
})
