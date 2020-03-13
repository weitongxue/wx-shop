// component/notice/index.js
Component({
  options: {
    styleIsolation: 'isolated'
  },
  /**
  * 组件的属性列表
  */
  properties: {
    noticeList: {
      type: Array,
      value: [],
    },
    icon: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    vertical: true,
    autoplay: true, // 是否自动切换
    interval: 2000, // 自动切换时间间隔
    duration: 500 // 滑动动画时长
  }
})
