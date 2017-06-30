import {openDB} from '../db'

export const queryGroups = async (status) => {
  const db = await openDB()
  const {byStatus} = db.taskGroup
  return await byStatus.getAll(status)
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
  return await db.taskGroup.put(group)
}
