import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '/',
        redirect: '/prediction-markets'
      },
      {
        path: '/prediction-markets',
        name: 'PredictionMarkets',
        component: () => import('@/views/pages/PredictionMarkets/PredictionMarkets.vue'),
        props: true
      },
      {
        path: '/milestone/:id',
        name: 'Milestone',
        component: () => import('@/views/pages/Milestone/Milestone.vue'),
        props: true
      },
      {
        path: '/governance',
        name: 'GovernanceVotings',
        component: () => import('@/views/pages/Governance/GovernanceVotings.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
