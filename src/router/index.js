import Vue from 'vue'
import Router from 'vue-router'
import TaskGroup from '@/modules/task/TaskGroup'
import TaskItem from '@/modules/task/TaskItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskGroup',
      component: TaskGroup
    },
    {
      path: '/group/:groupId',
      name: 'taskItem',
      component: TaskItem
    }
  ]
})
