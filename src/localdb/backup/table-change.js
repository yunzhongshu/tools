/**
 * 各版本的表更新操作
 * @type {{}}
 */
var TableChange = {}

const registerChangeEvent = (version, changeFunc) => {
  TableChange['version_' + version] = changeFunc
}

export const getChangeEvent = (version) => {
  return TableChange['version_' + version]
}

registerChangeEvent(1, (db) => {
  db.createObjectStore('taskGroup', {keyPath: 'id'})
  console.log('Table [%s] created.', 'taskGroup')

  let itemStore = db.createObjectStore('taskItem', {keyPath: 'id'})
  itemStore.createIndex('groupId', 'groupId', {unique: false})
  console.log('Table [%s] created.', 'taskItem')
})
