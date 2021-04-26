import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/prediction-markets',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        props: true
      },
      {
        path: '/prediction-markets',
        name: 'PredictionMarkets',
        component: () => import('@/views/pages/PredictionMarkets/PredictionMarkets.vue'),
        props: true
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
