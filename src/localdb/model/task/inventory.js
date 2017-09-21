import db from '../../db'

const TABLE = 'TaskInventory'

export const queryInventories = (status) => {
  return db[TABLE].where('status').equals(status).toArray()
}

export const getInventory = (inventoryId) => {
  return db[TABLE].get(inventoryId)
}

export const insertInventory = (inventoryName) => {
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
  let inventory = await db[TABLE].get(inventoryId)
  inventory.taskCount += incCount
  return db[TABLE].put(inventory)
}

export const deleteInventory = async (inventoryId) => {
  let inventory = await db[TABLE].get(inventoryId)
  inventory.status = 'disabled'
  return db[TABLE].put(inventory)
}
