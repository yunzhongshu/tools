import utils from '@/assets/js/utils'

export const queryGroups = ({commit}) => {
  return new Promise((resolve, reject) => {
    utils.requestPost('/task/list_groups.json', {status: 'enabled'}, (d) => {
      commit('QUERY_GROUPS', d)
      resolve()
    }, (res) => {
      reject(res)
    })
  })
}

export const saveGroup = ({dispatch, commit}, group) => {
  return new Promise((resolve, reject) => {
    utils.requestPost('/task/save_group.json', group, (d) => {
      dispatch('queryGroups')
      resolve()
    }, (res) => {
      reject(res)
    })
  })
}

export const checkAndQueryItems = ({dispatch, commit, state}, groupId) => {
  let items = state.groupUnFinishedItems[groupId]
  if (items) {
    commit('CURRENT_UNFINISHED_ITEMS', items)
  } else {
    dispatch('queryItems', groupId)
  }
}

export const queryItems = ({commit}, groupId) => {
  return new Promise((resolve, reject) => {
    utils.requestPost('/task/list_items.json', {groupId: groupId, finished: false, deleted: false}, (d) => {
      commit('SAVE_UNFINISHED_ITEMS', {
        groupId: groupId,
        items: d
      })
      commit('CURRENT_UNFINISHED_ITEMS', d)
      resolve()
    }, (res) => {
      reject(res)
    })
  })
}

export const saveItem = ({dispatch, commit}, item) => {
  return new Promise((resolve, reject) => {
    utils.requestPost('/task/save_item.json', item, (d) => {
      dispatch('queryItems')
      resolve()
    }, (res) => {
      reject(res)
    })
  })
}

/**
 * 删除任务项目
 * @param dispatch
 * @param commit
 * @param id
 * @returns {Promise}
 */
export const deleteItem = ({dispatch, commit}, item) => {
  return new Promise((resolve, reject) => {
    utils.requestPost('/task/delete_task.json', item, (d) => {
      dispatch('queryItems')
      resolve(d)
    }, (res) => {
      reject(res)
    })
  })
}

/**
 * 完成任务项目
 * @param dispatch
 * @param commit
 * @param id
 * @returns {Promise}
 */
export const finishItem = ({dispatch, commit}, item) => {
  return new Promise((resolve, reject) => {
    utils.requestPost('/task/finish_task.json', item, (d) => {
      dispatch('queryItems')
      resolve(d)
    }, (res) => {
      reject(res)
    })
  })
}
