import Dexie from 'dexie'

const db = new Dexie('toolkit')
db.version(1).stores({
  TaskInventory: '++id, status, taskCount',
  Task: '++id, inventoryId, status, updateTime'
})

db.on('populate', _ => {
  // Init your DB with some default data:
})

db.open().catch(error => {
  console.error('db open error: ' + error)
})

export default db

