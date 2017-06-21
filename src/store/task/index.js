import getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  groups: [],
  // groupId->items
  groupUnFinishedItems: {},
  currentUnFinishedItems: []
}

export default {
  state,
  getters,
  actions,
  mutations
}