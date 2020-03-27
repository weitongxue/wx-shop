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
    isNoMore: false
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
  // onTabItemTap: function (e) {
  //   console.log(e)
  // },
  onReachBottom() {
    const { groupId } = this.data
    const That = this
    let currentPage = app.globalData.page.currentPage
    currentPage++
    app.globalData.page.currentPage = currentPage
    Util.handleShake(That.getProduct(groupId), 1000)
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
    this.setData({ currentGroupId: groupId })
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
          let list = this.newList(groupId, res.data.data.list)
          that.setData({ productList: productList.concat(list) })
        }
      }
    })
  },
  // 数据结构改造 (key: 分类id, data：分类的数据)
  newList(key, data) {
    const { infoList, productList } = this.data
    let obj = Object.assign({}, { key, data })
    let newArr = new Array()
    if (Object.keys(productList[0]).length === 0) {
      productList[0] = obj
    } else {
      infoList.map((item, index) => {
        if (item.groupId === key) {
          productList[index] = obj
        }
      })
    }
    console.log(productList)
    return productList
  }
})
