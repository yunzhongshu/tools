import * as type from './mutations_types'

export default {
  [type.QUERY_GROUPS] (state, groups) {
    state.groups = groups
  },
  [type.SAVE_UNFINISHED_ITEMS] (state, info) {
    state.groupUnFinishedItems[info.groupId] = info.items
  },
  [type.CURRENT_UNFINISHED_ITEMS] (state, items) {
    state.currentUnFinishedItems = items
  }
}
