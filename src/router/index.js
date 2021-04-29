/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:33:05
 * @LastEditTime: 2021-04-15 14:41:14
 * @LastEditors: wish.WuJunLong
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
