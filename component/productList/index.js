// component/productList/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    infoList: {
      type: Array,
      value: []
    },
    productList: {
      type: Array,
      value: []
    },
    isNoMore: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    currentPage: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击导航
    handleCheck (e) {
      this.properties.isNoMore = false
      app.globalData.page.currentPage = 1
      const { id, index } = e.target.dataset
      this.setData({ activeIndex: index, currentPage: index })
      this.triggerEvent("handleProduct", { id })
    },
    // 左右切换
    changePage (e) {
      app.globalData.page.currentPage = 1
      const { currentItemId, source } = e.detail
      const { infoList } = this.properties
      const id = currentItemId
      if (source === "touch") {
        infoList.map((item, index) => {
          if (item.groupId === id) {
            this.setData({ activeIndex: index })
          }
        })
        this.properties.isNoMore = false
        this.triggerEvent("handleProduct", { id })
      }
    },
  }
})
