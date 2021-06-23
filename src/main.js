/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:33:05
 * @LastEditTime: 2021-06-18 10:15:56
 * @LastEditors: mzr
 */
import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import './plugins/global.less'

import router from './router'
Vue.config.productionTip = false
// 设置默认路由前缀
axios.defaults.baseURL="/WxChat"
// 拦截器

import axios from "axios"
Vue.prototype.$axios = axios;


import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.prototype.$imgUrl = 'http://192.168.0.178:9000/wxmessage/';


new Vue({
  router,
  render: h => h(App)
}).$mount('#weChatMonitor')
