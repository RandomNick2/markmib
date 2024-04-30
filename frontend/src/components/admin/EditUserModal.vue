<template>
  <Button class="text-white" :icon="PrimeIcons.PENCIL" v-ripple @click="isVisibleEdit = true" />

  <Dialog v-model:visible="isVisibleEdit" modal header="Редактировать студента">
    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Новый пароль</label>
      <InputText
        v-model="newPassword"
        class="flex-auto"
        autocomplete="off"
        placeholder="Введите новый пароль"
      />
    </div>

    <Button
      type="button"
      severity="blue"
      label="Сохранить"
      class="w-full h-10"
      v-ripple
      @click="changePassword"
      :disabled="isLoading"
    ></Button>
  </Dialog>
</template>

<script setup lang="ts">
import UserApi from '@/api/users.api';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();

const userId = defineModel('userId');
const isVisibleEdit = ref(false);
const isLoading = ref(false);
const newPassword = ref('');

async function changePassword() {
  isLoading.value = true
  // @ts-ignore
  await UserApi.changePassword(userId.value, newPassword.value);
  toast.add({
    severity: 'success',
    life: 3000,
    summary: 'Успешно!',
    detail: 'Пароль изменён'
  });
  isVisibleEdit.value = false;
  isLoading.value = false;
}
</script>
