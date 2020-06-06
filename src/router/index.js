import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound'
import Query from '@/views/Query'
import CheckOrder from '@/views/CheckOrder'
import Count from '@/views/Count'
import ProductPut from '@/views/ProductPut'

Vue.use(VueRouter)

// todo: rbac (use dynamic route Vue3 and Router4 or meta)
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/query',
    component: Query
  },
  {
    path: '/check-order',
    component: CheckOrder
  },
  {
    path: '/count',
    component: Count
  },
  {
    path: '/product-put',
    component: ProductPut
  },
]

routes.push({
  path: '*',
  name: 'NotFound',
  component: NotFound
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
