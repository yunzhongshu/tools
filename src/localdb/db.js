const DBName = 'tool'
const DBVersion = 1
var localDB = {
  db: null
}
const getIndexedDB = () => {
  let db = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB
  if ('webkitIndexedDB' in window) {
    window.IDBTransaction = window.webkitIDBTransaction
    window.IDBKeyRange = window.webkitIDBKeyRange
  }
  return db
}

var indexDB = getIndexedDB()

const onerror = (e) => {
  // handle error
  console.error('Database error: ' + e.target.errorCode)
}

/**
 * 打开或创建数据库
 * @param tables [{name:'xx', keyPath: 'xx', updateFunc: xxx}]
 */
localDB.openDatabase = (tables) => {
  var openRequest = indexDB.open(DBName, DBVersion)

  openRequest.onerror = onerror

  openRequest.onsuccess = (evt) => {
    console.log('DB [%s] created.', DBName)
    localDB.db = openRequest.result
  }

  openRequest.onupgradeneeded = (evt) => {
    console.log('DB [%s] updated.', DBName)
    console.log(evt)
    localDB.db = evt.target.result // evt.currentTarget.result
    tables.forEach((table) => {
      let tableName = table.name
      let store = localDB.db.objectStore(tableName)
      if (!store) {
        console.log('create store.')
        store = createObjectStore(tableName, table.keyPath)
      }
      if (table.updateFunc) {
        console.log('updateFunc.')
        table.updateFunc(store)
      }
    })
  }
}

localDB.deleteDatabase = () => {
  var deleteRequest = indexDB.deleteDatabase(DBName)
  deleteRequest.onerror = onerror

  deleteRequest.onsuccess = (evt) => {
    console.log('DB [%s] deleted.', DBName)
  }
}

const createObjectStore = (tableName, keyName) => {
  let store
  if (keyName) {
    store = localDB.db.createObjectStore(tableName, {keyPath: keyName})
  } else {
    store = localDB.db.createObjectStore(tableName)
  }
  return store
}

export default localDB
