import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import _ from 'lodash'

Vue.use(BootstrapVue);

import 'simple-line-icons/css/simple-line-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../src/assets/css/style.css'

Vue.config.productionTip = false;
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api/'
})

Vue.prototype._ = _
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
