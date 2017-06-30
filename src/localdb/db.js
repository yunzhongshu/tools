import treo from 'treo/dist/treo'
import Schema from 'idb-schema'

let schema = new Schema()
  .version(1)
  .addStore('taskGroup', {keyPath: 'id', increment: true})
  .addIndex('byStatus', 'status')
  .version(2)
  .addStore('taskItem', {keyPath: 'id', increment: true})
  .addIndex('byGroupId', ['groupId', 'status'])

export const openDB = () => {
  return treo('tool', schema.version(), schema.callback())
}
