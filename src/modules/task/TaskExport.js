import { exportXls } from '@/assets/js/xlsx-util'
import utils from '@/assets/js/utils'

const COLUMNS = [{
  key: 'title',
  desc: '任务标题'
}, {
  key: 'createTime',
  desc: '创建时间',
  type: 'date'
}, {
  key: 'updateTime',
  desc: '更新时间',
  type: 'date'
}]

const convertTaskToArray = (task) => {
  let array = []
  COLUMNS.forEach(column => {
    let value = task[column.key]
    if (column.type === 'date') {
      value = utils.formatDate('yyyy-MM-dd hh:mm:ss', new Date(value))
    }
    array.push(value)
  })
  return array
}

export const exportOneInventory = (inventory, unFinishedTasks, finishedTasks) => {
  let mySheets = []
  let taskDataList = []
  taskDataList.push(['未完成'])
  taskDataList.push(COLUMNS.map(column => column.desc))

  unFinishedTasks.forEach(task => {
    taskDataList.push(convertTaskToArray(task))
  })

  taskDataList.push('')
  taskDataList.push(['已完成'])
  taskDataList.push(COLUMNS.map(column => column.desc))
  finishedTasks.forEach(task => {
    taskDataList.push(convertTaskToArray(task))
  })

  mySheets.push({
    name: inventory.name,
    data: taskDataList
  })
  exportXls(mySheets, '任务清单' + new Date().getTime() + '.xlsx')
}
