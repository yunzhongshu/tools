import {openDB} from '../../db'

const TABLE = 'TaskInventory'

export const queryInventories = async (status) => {
  const db = await openDB()
  const {byStatus} = db[TABLE]
  return byStatus.getAll(status)
}

export const getInventory = async (inventoryId) => {
  const db = await openDB()
  return db[TABLE].get(inventoryId)
}

export const insertInventory = async (inventoryName) => {
  const db = await openDB()
  let group = {
    name: inventoryName,
    taskCount: 0,
    createTime: Date.now(),
    updateTime: Date.now(),
    status: 'enabled'
  }
  return db[TABLE].put(group)
}

export const increTaskCount = async (inventoryId, incCount = 1) => {
  const db = await openDB()
  let inventory = await db[TABLE].get(inventoryId)
  inventory.taskCount += incCount
  return db[TABLE].put(inventory)
}

export const deleteInventory = async (inventoryId) => {
  const db = await openDB()
  let inventory = await db[TABLE].get(inventoryId)
  inventory.status = 'disabled'
  return db[TABLE].put(inventory)
}
