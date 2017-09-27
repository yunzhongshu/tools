import Vue from 'vue'
import Router from 'vue-router'
import Inventory from '@/modules/task/Inventory'
import Task from '@/modules/task/Task'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inventory',
      component: Inventory
    },
    {
      path: '/inventory/:inventoryId',
      name: 'Task',
      component: Task
    }
  ]
})
