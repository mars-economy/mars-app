import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'PredictionMarkets',
        component: () => import('@/views/pages/PredictionMarkets/PredictionMarkets.vue'),
        props: true
      },
      {
        path: '/milestone/:id',
        name: 'Milestone',
        component: () => import('@/views/pages/Milestone/Milestone.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
