import Dexie from 'dexie'

const db = new Dexie('toolkit')
db.version(1).stores({
  TaskInventory: '++id, status',
  Task: '++id, inventoryId, status, updateTime'
})

db.open().catch(function(error) {
  console.error('db open error: ' + error);
});

export default db
