import treo from 'treo/dist/treo'
import Schema from 'idb-schema'

let schema = new Schema()
  .version(1)
  .addStore('TaskInventory', {keyPath: 'id', increment: true})
  .addIndex('byStatus', 'status')
  .version(2)
  .addStore('Task', {keyPath: 'id', increment: true})
  .addIndex('byInventoryId', ['inventoryId', 'status'])
  .version(3)
  .getStore('Task')
  .addIndex('byInventoryIdAndTime', ['inventoryId', 'status', 'updateTime'])

export const openDB = () => {
  return treo('toolkit', schema.version(), schema.callback())
}
