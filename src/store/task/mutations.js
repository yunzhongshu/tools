import * as type from './mutations_types'

export default {
  [type.QUERY_GROUPS] (state, groups) {
    state.groups = groups
  },
  [type.SAVE_UNFINISHED_ITEMS] (state, groupId, items) {
    for (let i = 0; i < state.groups.length; i++) {
      var group = state.groups[i]
      if (group.id === groupId) {
        group.unFinishedItems = items
        return
      }
    }
  },
  [type.SAVE_FINISHED_ITEMS] (state, groupId, items) {
    for (let i = 0; i < state.groups.length; i++) {
      var group = state.groups[i]
      if (group.id === groupId) {
        group.finishedItems = items
        return
      }
    }
  }
}
