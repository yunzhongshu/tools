const getters = {
  getGroups (state) {
    return state.groups
  },
  getGroupUnFinishedItems (state) {
    return state.groupUnFinishedItems
  },
  getCurrentUnFinishedItems (state) {
    return state.currentUnFinishedItems
  }
}

export default getters
