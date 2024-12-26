import Vue from 'vue'
import App from './App.vue'

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); 

//引入全局样式
import './assets/css/global.css'

//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios
Vue.prototype.$httpUrl = 'http://localhost:8099'

//引入路由
import VueRouter from 'vue-router';
import router from './router'
Vue.use(VueRouter);

//
import store from './store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
