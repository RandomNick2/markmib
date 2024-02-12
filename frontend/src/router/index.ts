import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user.store'
import { UserRole } from '@/stores/user.store'

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
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { auth: true }
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/GroupsView.vue'),
      meta: { auth: true, role: UserRole.TEACHER }
    },
    {
      path: '/group/:id',
      name: 'group',
      component: () => import('../views/GroupView.vue'),
      meta: { auth: true, role: UserRole.TEACHER }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()

  //  Проверка на роль
  user.loadUser().then(function () {
    const requireRole = to.meta.role

    if (user.role === UserRole.ADMIN) {
      return next()
    }

    if (requireRole && user.role !== requireRole) {
      return next('/')
    }

    //  Проверка на авторизацию
    const requireAuth = to.matched.some((record) => record.meta.auth)
    if (to.name === 'auth' && user.isLogged) {
      return next('/')
    }

    if (requireAuth && !user.isLogged) {
      return next('/auth')
    } else {
      return next()
    }
  })
})

export default router
