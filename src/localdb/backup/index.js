import treo from 'treo'
import {process} from '../db-util'
// import treoPromise from 'treo/plugins/treo-promise'

let scheme = treo.schema()
  .version(1)
  .addStore('taskGroup', {key: 'id'})
  .addIndex('byStatus', 'status')
  .version(2)
  .addStore('taskItem', {key: 'id'})
  .addIndex('byGroupId', ['groupId', 'status'])

let db = treo('tool', scheme)
let store = db.store('taskGroup')


export const queryGroups = (status) => {
  return new Promise((resolve, reject) => {
    store.index('byStatus').get(status, (err, results) => {
      process(resolve, reject, err, results)
    })
  })
}

export const saveGroup = (group) => {
  return new Promise((resolve, reject) => {
    store.put(group, (err, result) => {
      process(resolve, reject, err, result)
    })
  })
}

export const queryItems = (groupId, status) => {

}
