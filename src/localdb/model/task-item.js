import {openDB} from '../db'
import range from 'idb-range'
import {increTaskCount} from '@/localdb/model/task-group'

export const queryItems = async (groupId, status) => {
  console.log('groupId=%s, status=%s', groupId, status)
  const db = await openDB()
  const {byGroupId} = db.taskItem
  return byGroupId.getAll(range([groupId, status]), [10])
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
  const promise = await db.taskItem.put(taskItem)
  increTaskCount(groupId)
  return promise
}

const changeTaskStatus = async (taskItem, newStatus) => {
  const db = await openDB()
  taskItem.status = newStatus
  return db.taskItem.put(taskItem)
}

export const finishItem = async (taskItem) => {
  const promise = changeTaskStatus(taskItem, 'finished')
  increTaskCount(taskItem.groupId, -1)
  return promise
}

export const unfinishItem = async (taskItem) => {
  const promise = changeTaskStatus(taskItem, 'unfinished')
  increTaskCount(taskItem.groupId)
  return promise
}

export const deleteItem = async (taskItem) => {
  const promise = changeTaskStatus(taskItem, 'deleted')
  increTaskCount(taskItem.groupId, -1)
  return promise
}
