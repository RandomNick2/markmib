import { useUserStore } from '@/stores/user.store';
import { UserRole } from '@/types/user';
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      redirect: '/journals'
      // meta: { auth: false }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: { auth: false }
    },
    // {
    // path: '/profile',
    // name: 'profile',
    // component: () => import('../views/ProfileView.vue'),
    // meta: { auth: true }
    // },
    {
      path: '/journals',
      name: 'journals',
      component: () => import('../views/JournalsView.vue'),
      meta: { auth: true }
    },
    {
      path: '/journal/:id',
      name: 'journal',
      component: () => import('../views/JournalView.vue'),
      meta: { auth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/admin/UsersView.vue'),
      meta: { auth: true, role: UserRole.ADMIN }
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/admin/GroupsView.vue'),
      meta: { auth: true, role: UserRole.ADMIN }
    },
    {
      path: '/group/:id',
      name: 'group',
      component: () => import('../views/admin/GroupView.vue'),
      meta: { auth: true, role: UserRole.ADMIN }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const user = useUserStore();
  user.loadUser().then(function () {
    //  Проверка на роль
    const requireRole = to.meta.role;

    if (requireRole && user.role == UserRole.ADMIN) return next();

    if (requireRole && user.role !== requireRole) {
      return next('/journals');
    }

    //  Проверка на авторизацию
    const requireAuth = to.matched.some((record) => record.meta.auth);
    if (requireAuth && !user.isLogged) return next('/auth');

    return next();
  });
});

export default router;
