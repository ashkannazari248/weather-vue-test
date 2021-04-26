import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTemperatureLow,faTemperatureHigh,faSortUp,faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTemperatureLow,faTemperatureHigh,faSortUp,faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
global.axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
