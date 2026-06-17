<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { UserRole } from '@/types/user';
import { PrimeIcons } from 'primevue/api';
import type { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import './navbar.scss';

interface NavItem extends MenuItem {
  routeName: string;
  role?: UserRole;
}

const userStore = useUserStore();
const router = useRouter();

const items = computed<NavItem[]>(() => [
  {
    label: 'Журналы',
    icon: PrimeIcons.BOOK,
    routeName: 'journals'
  },
  {
    label: 'Группы',
    icon: PrimeIcons.USERS,
    routeName: 'groups',
    role: UserRole.ADMIN
  },
  {
    label: 'Пользователи',
    icon: PrimeIcons.ID_CARD,
    routeName: 'users',
    role: UserRole.ADMIN
  }
]);

const visibleItems = computed(() =>
  items.value.filter((item) => !item.role || userStore.role === item.role || userStore.role === UserRole.ADMIN)
);

const profileButton = computed<MenuItem[]>(() => [
  {
    label: 'Выйти',
    icon: PrimeIcons.SIGN_OUT,
    command: logout
  }
]);

function logout() {
  userStore.logout();
  router.push({ name: 'auth' });
}
</script>

<template>
  <header class="nav-shell">
    <div class="wrapper">
      <Menubar :model="visibleItems" class="nav-shell__bar">
        <template #start>
          <RouterLink class="nav-shell__brand" :to="{ name: 'home' }">
            <span class="nav-shell__brand-mark">M</span>
            <span>MarKmib</span>
          </RouterLink>
        </template>

        <template #item="{ item, props }">
          <RouterLink class="nav-shell__item" :to="{ name: item.routeName }" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </template>

        <template #end>
          <RouterLink :to="{ name: 'auth' }" v-if="!userStore.isLogged">
            <Button label="Войти" severity="contrast" />
          </RouterLink>

          <div class="nav-shell__profile" v-else>
            <div class="nav-shell__profile-copy">
              <span class="nav-shell__profile-name">
                {{ userStore.firstName || userStore.username }}
              </span>
              <span class="nav-shell__profile-role">{{ userStore.role }}</span>
            </div>

            <SplitButton icon="pi pi-user" :model="profileButton" severity="contrast">
              <template #default>
                <span class="p-button-label ml-2 pr-2" data-pc-section="label">
                  {{ userStore.username || 'Профиль' }}
                </span>
              </template>
            </SplitButton>
          </div>
        </template>
      </Menubar>
    </div>
  </header>
</template>
