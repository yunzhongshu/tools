import {openDB} from '../db'

export const queryGroups = async (status) => {
  const db = await openDB()
  const {byStatus} = db.taskGroup
  return byStatus.getAll(status)
}

export const saveGroup = async (groupName) => {
  const db = await openDB()
  let group = {
    name: groupName,
    taskCount: 0,
    createTime: Date.now(),
    updateTime: Date.now(),
    status: 'enabled'
  }
  return db.taskGroup.put(group)
}

export const increTaskCount = async (groupId, incCount = 1) => {
  const db = await openDB()
  let group = await db.taskGroup.get(groupId)
  group.taskCount += incCount
  return db.taskGroup.put(group)
}
