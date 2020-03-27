export default {
  // 防抖函数
  handleShake: function (fn, time) {
    let Timer = null
    return () => {
      clearTimeout(Timer)
      Timer = setTimeout(fn, time)
    }
  },
  // 表单校验
  /**
   * validators = {
   *    name: {
   *      validate(value) {
            return value.length > 6;
          },
          message: '用户名长度不能小于六'
   *    }
   * }
  */
  handleValidator: function (obj, validators) {
    return new Proxy(obj, {
      set (target, key, value, self) {
        const validator = validators[key]
        if (!validator) {
          return
        } else if (validator.validate(value)) {
          target[key] = value
        } else {
          wx.showToast({
            title: validator.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
}