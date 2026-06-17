import { useUserStore } from '@/stores/user.store';
import { UserRole } from '@/types/user';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/journals'
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: { auth: false }
    },
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

router.beforeEach(async (to) => {
  const user = useUserStore();

  if (!user.hydrated) {
    await user.loadUser();
  }

  const requireAuth = to.matched.some((record) => record.meta.auth);
  const requireRole = to.meta.role as UserRole | undefined;

  if (requireAuth && !user.isLogged) {
    return { name: 'auth' };
  }

  if (to.name === 'auth' && user.isLogged) {
    return { name: 'journals' };
  }

  if (requireRole && user.role !== UserRole.ADMIN && user.role !== requireRole) {
    return { name: 'journals' };
  }

  return true;
});

export default router;
