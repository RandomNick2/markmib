<template>
  <div v-for="group in groupStore.groups" :key="group.id" class="mt-10 flex ">
    <RouterLink :to="{ name: 'group', params: { id: group.id } }">
      <Button :label="group.name" security="primary" class="p-4 rounded-md bg-secondary"/>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGroupStore } from '@/stores/group.store';
import type { GroupStore } from '@/stores/group.store';

export default defineComponent({
  data() {
    const groupStore: GroupStore = useGroupStore()

    return {
      groupStore: groupStore
    }
  },
  
  async mounted() {
    await this.groupStore.getAllGroups()
  }
})
</script>
