import localDB from './db'
const TABLE = 'taskGroup'

export const saveGroup = (group) => {
  let tx = localDB.db.transaction(TABLE, 'readwrite')
  let store = tx.objectStore(TABLE)
  store.put(group)

  console.log(tx)
}

export const queryEnableGroups = () => {
  let tx = localDB.db.transaction(TABLE)
  let store = tx.objectStore(TABLE)

}
