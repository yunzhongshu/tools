import Vue from 'vue'
import Store from '../../store/index'

export default {
  install () {
    Vue.prototype.groupItems = (groupId) => Store.getters.getGroupUnFinishedItems[groupId]
  }
}
