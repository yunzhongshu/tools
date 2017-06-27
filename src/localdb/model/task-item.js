import db from '../db'
import {process} from '../db-util'
let store = db.store('taskItem')

export const queryItems = (groupId, status) => {
  return new Promise((resolve, reject) => {
    store.index('byGroupId').get([groupId, status], (err, result) => process(resolve, reject, err, result))
  })
}

