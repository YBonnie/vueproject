import Vue from 'vue'

import App from './App.vue'

import router from './router/index.js'

import 'lib-flexible/flexible.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './iconfont/iconfont.css'


import { Row, Col } from 'vant';

Vue.use(Row).use(Col);
Vue.use(VueAxios,axios);

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
