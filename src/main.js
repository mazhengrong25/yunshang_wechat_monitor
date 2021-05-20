/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:33:05
 * @LastEditTime: 2021-05-07 17:24:37
 * @LastEditors: mzr
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/global.less'

import axios from "axios"
Vue.prototype.$axios = axios;

import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.prototype.$imgUrl = 'http://192.168.0.178:9000/wxmessage/';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#weChatMonitor')
