// component/swiper/weiper.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    imageList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false, // 是否自动切换
    interval: 2000, // 自动切换时间间隔
    duration: 500 // 滑动动画时长
  }
})
