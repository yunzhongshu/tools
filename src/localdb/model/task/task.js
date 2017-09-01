import {openDB} from '../db'
import {increTaskCount} from './inventory'

const TABLE = 'Task'

export const queryTasks = async (inventoryId, status) => {
  const db = await openDB()
  const {byInventoryId} = db[TABLE]
  return byInventoryId.getAll(range([inventoryId, status]), [10])
}

export const saveTask = async (inventoryId, title) => {
  const db = await openDB()
  let task = {
    title: title,
    inventoryId: inventoryId,
    status: 'unfinished',
    createTime: Date.now(),
    updateTime: Date.now()
  }
  const promise = await db[TABLE].put(task)
  increTaskCount(inventoryId)
  return promise
}

const changeTaskStatus = async (task, newStatus) => {
  const db = await openDB()
  task.status = newStatus
  return db[TABLE].put(task)
}

export const finishTask = async (task) => {
  const promise = changeTaskStatus(task, 'finished')
  increTaskCount(task.inventoryId, -1)
  return promise
}

export const unfinishTask = async (task) => {
  const promise = changeTaskStatus(task, 'unfinished')
  increTaskCount(task.inventoryId)
  return promise
}

export const deleteTask = async (task) => {
  const promise = changeTaskStatus(task, 'deleted')
  increTaskCount(task.inventoryId, -1)
  return promise
}
