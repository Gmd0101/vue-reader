// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import router from './router/index.js';

import FontAwesome from "./assets/Font-Awesome/css/font-awesome.css";

import iView from 'iview';
import 'iview/dist/styles/iview.css';


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(iView);

Vue.use(ElementUI);

import { formatDate } from './utils/filter.js';
Vue.filter('formatDate', formatDate);


// import Home from './components/HelloFromVux'

// Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
