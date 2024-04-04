<template>
  <div class="wrapper mt-9">
    <h1 class="font-bold text-xl">Группы</h1>
    <div class="table-wrapper mt-4">
      <table class="w-full">
        <thead>
          <th>Название</th>
          <th class="text-right w-0 pl-0" v-if="userStore.role == UserRole.ADMIN">
            <Button
              class="text-white"
              :icon="PrimeIcons.PLUS"
              v-ripple
              v-tooltip.bottom="'Создать группу'"
              @click="isVisibleCreateGroup = true"
            />
          </th>
        </thead>

        <tbody>
          <tr v-for="group in groupStore.groups" :key="group.id">
            <td>{{ group.name }}</td>
            <td class="text-right">
              <Button
                class="text-center"
                security="primary"
                v-ripple
                :icon="PrimeIcons.ARROW_RIGHT"
                @click="$router.push({ name: 'group', params: { id: group.id } })"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Dialog
    v-model:visible="isVisibleCreateGroup"
    modal
    header="Создать группу"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Название</label>
      <InputText v-model="groupName" class="flex-auto" autocomplete="off" placeholder="ПОБ-11" />
    </div>
    <Button
      type="button"
      severity="blue"
      label="Создать"
      class="w-full h-10"
      v-ripple
      @click="createGroup"
      :disabled="isLoading"
    ></Button>
  </Dialog>
</template>

<script setup lang="ts">
import { useGroupStore } from '@/stores/group.store';
import { useUserStore } from '@/stores/user.store';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { UserRole } from '@/types/user';

const toast = useToast();
const groupStore = useGroupStore();
const userStore = useUserStore();

const isVisibleCreateGroup = ref(false);
const groupName = ref('');
const isLoading = ref(false);

onMounted(async () => {
  await groupStore.findAll();
});

async function createGroup() {
  try {
    isLoading.value = true;
    await groupStore.create(groupName.value);
    groupName.value = '';
    isLoading.value = false;
    toast.add({
      summary: 'Успешно!',
      detail: 'Группа добавлена',
      life: 3000,
      severity: 'success'
    });
  } catch (e) {
    toast.add({
      summary: 'Ошибка!',
      life: 3000,
      severity: 'error'
    });
  }
}
</script>
