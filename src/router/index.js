import Vue from 'vue'
import VueRouter from 'vue-router'
import { ROLE } from '@/store/const'
import store from '@/store'
import Home from '@/views/Home'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound'
import Query from '@/views/Query'
import CheckOrder from '@/views/CheckOrder'
import Count from '@/views/Count'
import ProductPut from '@/views/ProductPut'
import OrderCreate from '@/views/OrderCreate'
import CheckReturn from '@/views/CheckReturn'

Vue.use(VueRouter)

const auth = {}
auth[ROLE.DEFAULT] = ['/', '/not-found', '/about']
auth[ROLE.WORKER] = [
  '/',
  '/not-found',
  '/query',
  '/check-order',
  '/count',
  '/product-put',
  '/check-return',
]
auth[ROLE.CUSTOMER] = ['/', '/not-found', '/create-order',]

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/not-found',
    component: NotFound
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
  {
    path: '/create-order',
    component: OrderCreate
  },
  {
    path: '/check-return',
    component: CheckReturn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (auth[store.state.role].includes(to.path)) {
    next()
  } else {
    next('/not-found')
  }
})

export default router
