import Vue from 'vue'
import utils from '@/assets/js/utils'

export default {
  install () {
    Vue.filter('dateTime', (value, fmt = 'yyyy年MM月dd日') => {
      return utils.formatDate(fmt, new Date(value))
    })

    /**
     * 文字最大长度
     */
    Vue.filter('maxLen', (value, len) => {
      if (value.length <= len) {
        return value
      } else {
        return value.substr(0, len) + '...'
      }
    })
  }
}
