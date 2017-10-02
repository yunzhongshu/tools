import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/modules/Home'
import Inventory from '@/modules/task/Inventory'
import Task from '@/modules/task/Task'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inventory',
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
