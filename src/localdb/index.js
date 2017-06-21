const dbName = 'tools'
// 实例化IndexDB数据上下文，这边根据浏览器类型来做选择
var IndexedDB = {}
IndexedDB.db = null

IndexedDB.onerror = (e) => {
  console.error(e)
}

const getIndexedDB = () => {
  let db = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB
  if ('webkitIndexedDB' in window) {
    window.IDBTransaction = window.webkitIDBTransaction
    window.IDBKeyRange = window.webkitIDBKeyRange
  }
  return db
}

const open = (tableName, version) => {
  let db = getIndexedDB()
  let request = db.open(dbName, version)

  console.log(request)

  request.onsuccess = (e) => {
    console.log('Success open DB: ' + dbName)
    IndexedDB.db = e.target.result
    console.log(IndexedDB.db)
  }

  request.onupgradeneeded = (e) => {
    console.log('update db.')
    IndexedDB.db = e.target.result
    var db = IndexedDB.db
    if (db.objectStoreNames.contains(tableName)) {
      db.deleteObjectStore(tableName)
    }
    db.createObjectStore(tableName, { keyPath: 'id' }) // NoSQL类型数据库中必须的主键，唯一性
  }

  request.onfailure = IndexedDB.onerror
}

IndexedDB.open = open

export default IndexedDB
