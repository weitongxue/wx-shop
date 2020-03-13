// component/productList/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    productList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false, // 是否自动切换
    duration: 500 // 滑动动画时长
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
