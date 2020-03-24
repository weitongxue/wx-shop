export default {
  // 防抖函数
  handleShake: function (fn, time) {
    let Timer = null
    return () => {
      clearTimeout(Timer)
      Timer = setTimeout(fn, time)
    }
  }
}