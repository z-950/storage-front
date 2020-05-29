import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound'
import Query from '@/views/Query'
import MakeOrder from '@/views/MakeOrder'
import PickOrder from '@/views/PickOrder'
import Count from '@/views/Count'

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
    path: '/make-order',
    component: MakeOrder
  },
  {
    path: '/pick-order',
    component: PickOrder
  },
  {
    path: '/count',
    component: Count
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
