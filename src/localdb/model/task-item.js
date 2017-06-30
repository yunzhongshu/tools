import {openDB} from '../db'

export const queryItems = async (groupId, status) => {
  const db = await openDB()
  const {byGroupId} = db.taskItem
  return byGroupId.getAll([groupId, status])
}

export const saveItem = async (groupId, title) => {
  const db = await openDB()
  let taskItem = {
    title: title,
    groupId: groupId,
    status: 'unfinished',
    createTime: Date.now(),
    updateTime: Date.now()
  }
  return db.taskItem.put(taskItem)
}
