import Vue from 'vue'
import utils from '@/assets/js/utils'
import lodash from 'lodash'

export default {
  install () {
    Object.defineProperty(Vue.prototype, '$lodash', {value: lodash})

    Vue.filter('dateTime', (value, fmt = 'yyyy年MM月dd日') => {
      return utils.formatDate(fmt, new Date(value))
    })

    /**
     * 文字最大长度
     */
    Vue.filter('maxLen', (value, len) => {
      return utils.maxLength(value, len)
    })
  }
}
