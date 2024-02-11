import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: false }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: { auth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !user.isLogged) {
    next('/auth')
  } else {
    next()
  }
})

export default router
