import Vue from 'vue'
import utils from '@/assets/js/utils'

export const queryGroups = ({commit}) => {
  return new Promise((resolve, reject) => {
    Vue.http.get('/task/list_groups.json').then(d => {
      console.log(d)
      let data = utils.getResponseData(d)
      commit('QUERY_GROUPS', data)
      resolve()
    }, d => {
      reject()
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

export const queryItems = ({commit}) => {
  return new Promise((resolve, reject) => {
    Vue.http.get('/task/list_items.json').then(d => {
      console.log(d)
      let data = utils.getResponseData(d)
      commit('QUERY_GROUPS', data)
      resolve()
    }, d => {
      reject()
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
