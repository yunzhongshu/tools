import { Notification } from 'element-ui'
import { getChangeEvent } from './table-change'

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
  let errMsg = 'Database error: ' + e.target.error.message
  console.error(errMsg)
  Notification.error({
    title: 'error',
    message: errMsg
  })
}

localDB.onerror = onerror

/**
 * 打开或创建数据库
 * @param tables [{name:'xx', keyPath: 'xx', updateFunc: xxx}]
 */
localDB.openDatabase = () => {
  return new Promise((resolve, reject) => {
    var openRequest = indexDB.open(DBName, DBVersion)

    openRequest.onerror = (evt) => {
      onerror(evt)
      reject()
    }

    openRequest.onsuccess = (evt) => {
      console.log('DB [%s] opened.', DBName)
      localDB.db = openRequest.result
      resolve()
    }

    openRequest.onupgradeneeded = (evt) => {
      console.log('DB [%s] updated.', DBName)
      localDB.db = evt.currentTarget.result // evt.currentTarget.result
      let changeEvt = getChangeEvent(evt.newVersion)
      changeEvt(localDB.db)
    }
  })
}

localDB.deleteDatabase = () => {
  var deleteRequest = indexDB.deleteDatabase(DBName)
  deleteRequest.onerror = onerror

  deleteRequest.onsuccess = (evt) => {
    console.log('DB [%s] deleted.', DBName)
  }
}

export default localDB
