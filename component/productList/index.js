// component/productList/index.js
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
      const { id, index } = e.target.dataset
      this.setData({ activeIndex: index, currentPage: index })
      this.triggerEvent("handleProduct", { id })
    },
    // 左右切换
    changePage (e) {
      const { currentItemId } = e.detail
      const id = this.properties.infoList[currentItemId].groupId
      this.setData({ activeIndex: Number(currentItemId) })
      this.triggerEvent("handleProduct", { id })
    }
  }
})
