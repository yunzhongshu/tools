import Vue from 'vue'
import Store from '../../store/index'
import utils from '@/assets/js/utils'

export default {
  install () {
    Vue.prototype.groupItems = (groupId) => Store.getters.getGroupUnFinishedItems[groupId]

    Vue.filter('dateTime', (value, fmt = 'yyyy年MM月dd日') => {
      return utils.formatDate(fmt, new Date(value))
    })
  }
}
