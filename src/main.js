// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/base.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import VueUtils from './assets/js/vue-utils'

Vue.use(VueResource)
Vue.use(ElementUI, { locale })

Vue.use(VueResource)
Vue.use(VueUtils)

// icon import
import 'vue-awesome/icons/list-ul'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/file-excel-o'
import 'vue-awesome/icons/clock-o'

import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
