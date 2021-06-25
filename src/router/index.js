/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:33:05
 * @LastEditTime: 2021-06-25 10:41:06
 * @LastEditors: mzr
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
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
