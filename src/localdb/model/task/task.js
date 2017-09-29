import db from '../../db'
import {increTaskCount} from './inventory'

const TABLE = 'Task'

export const queryTasks = (inventoryId, status) => {
  return db[TABLE].where('inventoryId').equals(inventoryId).filter(task => task.status === status)
    .reverse()
    .sortBy('updateTime')
}

export const saveTask = async (inventoryId, title) => {
  let task = {
    title: title,
    inventoryId: inventoryId,
    status: 'unfinished',
    createTime: Date.now(),
    updateTime: Date.now()
  }
  const promise = await db[TABLE].add(task)
  increTaskCount(inventoryId)
  return promise
}

const changeTaskStatus = (task, newStatus) => {
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
  let needDecCount = task.status === 'unfinished'
  const promise = changeTaskStatus(task, 'deleted')
  if (needDecCount) {
    increTaskCount(task.inventoryId, -1)
  }
  return promise
}
