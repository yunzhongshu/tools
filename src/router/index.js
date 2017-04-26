import Vue from 'vue'
import Router from 'vue-router'
import TaskList from '@/modules/task/TaskList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskList',
      component: TaskList
    }
  ]
})
