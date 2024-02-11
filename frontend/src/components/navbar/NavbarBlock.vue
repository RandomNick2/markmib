<template>
  <Menubar :model="items">
    <template #start>
      <span class=""> MarKmib </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <RouterLink v-ripple class="flex items-center" v-bind="props.action" :to="{ name: item.routeName }">
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
      <RouterLink  :to="{ name: 'auth' }" v-if="!user.isLogged">
        <Button label="Войти" severity="info"/>
      </RouterLink>

      <div class="flex align-items-center gap-2" v-else>
        <Button icon="pi pi-user" />
      </div>
    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user.store'
import type { UserState } from '@/stores/user.store'

export default defineComponent({
  data() {
    const userStore = useUserStore()

    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routeName: 'home'
        }
      ],
      user: userStore as UserState
    }
  },

  methods: {
    goto() {
      console.log('goto')
    }
  }
})
</script>

<style lang="scss">
@import './navbar';
</style>
