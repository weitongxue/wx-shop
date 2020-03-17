// component/productList/index.js
import Util from '../../utils/util.js'
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
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCheck (e) {
      const { id, index } = e.target.dataset
      this.setData({ activeIndex: index })
      this.triggerEvent("handleProduct", { id })
    }
  }
})
