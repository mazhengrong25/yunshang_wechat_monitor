/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:33:05
 * @LastEditTime: 2021-11-10 10:20:18
 * @LastEditors: mzr
 */
import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import './plugins/global.less'

// 页面路径
import router from './router'
Vue.config.productionTip = false
// 设置默认路由前缀
axios.defaults.baseURL = "/WxChat"

import axios from "./api/api"
Vue.prototype.$axios = axios;


import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.prototype.$imgUrl = 'http://192.168.0.178:9000/wxmessage/';


new Vue({
  router,
  render: h => h(App)
}).$mount('#weChatMonitor')
