import db from '../db'
import {process} from '../db-util'
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
