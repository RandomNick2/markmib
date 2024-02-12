<script lang="ts" setup>
import { UserRole } from '@/stores/user.store'
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <span class=""> MarKmib </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <RouterLink
        v-ripple
        class="flex items-center bg-secondary"
        :to="{ name: item.routeName }"
        v-if="!item.role || user.role === item.role || user.role === UserRole.ADMIN"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="ml-auto border border-surface-200 dark:border-surface-500 rounded-md bg-surface-100 dark:bg-surface-800 text-xs p-1"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down text-primary-500 dark:text-primary-400-500 dark:text-primary-400',
            { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
          ]"
        ></i>
      </RouterLink>
    </template>
    <template #end>
      <RouterLink :to="{ name: 'auth' }" v-if="!user.isLogged">
        <Button label="Войти" severity="info" />
      </RouterLink>

      <div class="flex align-items-center gap-2" v-else>
        <SplitButton
          @click="$router.push({ name: 'profile' })"
          v-ripple
          icon="pi pi-user"
          :model="profileButton"
          id="user_dropdown"
          :label="user.username"
        >
        <template #default>
          <Avatar :image="user.avatarUrl" shape="circle" />
          <span class="p-button-label ml-2" data-pc-section="label">{{ user.firstName }}</span>
        </template>
      </SplitButton>
      </div>

    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user.store'
import type { UserStore } from '@/stores/user.store'
import type { MenuItem } from 'primevue/menuitem'

interface MenuItemCustom extends MenuItem {
  role?: UserRole
}

export default defineComponent({
  data() {
    const userStore = useUserStore()

    return {
      items: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
          routeName: 'home'
        },
        {
          label: 'Группы',
          icon: 'pi pi-users',
          routeName: 'groups',
          role: UserRole.TEACHER
        }
      ],
      profileButton: [
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          command: this.logout
        }
      ] as MenuItemCustom[],
      user: userStore as UserStore
    }
  },

  methods: {
    logout() {
      this.user.logout()
      this.$router.push({ name: 'auth' })
    }
  }
})
</script>

<style lang="scss">
@import './navbar';
</style>
