import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Trying out a different table component
import {ClientTable, Event} from 'vue-tables-2'

// import the styles
import '../public/styles/vueish-dark.scss' // bulma with customisation

Vue.use(ClientTable, {}, false, 'bulma')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
