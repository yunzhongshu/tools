import treo from 'treo'

let scheme = treo.schema()
  .version(1)
  .addStore('taskGroup', {key: 'id'})
  .addIndex('byStatus', 'status')
  .version(2)
  .addStore('taskItem', {key: 'id'})
  .addIndex('byGroupId', ['groupId', 'status'])

let db = treo('tool', scheme)

export default db
