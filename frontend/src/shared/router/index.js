import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/shared/pages/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/polls/create',
    name: 'poll-create',
    component: () => import('../../features/polls/pages/PollCreationPage.vue')
  },
  {
    path: '/polls/:id/vote',
    name: 'poll-vote',
    component: () => import('../../features/polls/pages/PollVotingPage.vue')
  },
  {
    path: '/polls/:id/results',
    name: 'poll-results',
    component: () => import('../../features/polls/pages/PollResultsPage.vue')
  },
  {
    path: '/polls',
    name: 'polls-list',
    component: () => import('../../features/polls/pages/PollListPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
