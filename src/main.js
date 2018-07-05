import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueGoodTablePlugin from 'vue-good-table'

// import the styles
import 'vue-good-table/dist/vue-good-table.css'
// bulma for css
import 'bulma/css/bulma.css'

Vue.use(VueGoodTablePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
