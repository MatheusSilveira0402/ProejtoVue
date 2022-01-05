import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//TEMPORARIO

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGhldXMiLCJlbWFpbCI6Im1hdGhldXNAdGVzdGUuY29tLmJyIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0MTMxOTU4MywiZXhwIjoxNjQxNTc4NzgzfQ.UqEHUriK9Yfw9Mh6Mg8ccEFHCPKVU4BLHOqwj2spC6A'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')