<template>
  <div class="group" v-if="groupStore.group">
    <div class="wrapper mt-9">
      <h1 class="font-bold text-xl">Группа: {{ groupStore.group.name }}</h1>
      <div class="table-wrapper mt-4">
        <table class="w-full">
          <thead>
            <th>ФИО</th>
            <th class="text-right w-0 pl-0">
              <Button
                class="text-white"
                :icon="PrimeIcons.PLUS"
                v-ripple
                @click="isVisibleCreateStudent = true"
                v-tooltip.bottom="'Создать студента'"
              />
            </th>
          </thead>
          <tbody>
            <tr v-for="student in groupStore.group.students" :key="student.id">
              <td>{{ student.firstName }} {{ student.lastName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="isVisibleCreateStudent"
    modal
    header="Добавить студента"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Логин</label>
      <InputText
        v-model="userData.username"
        class="flex-auto"
        autocomplete="off"
        placeholder="Введите логин"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Пароль</label>
      <InputText
        v-model="userData.password"
        class="flex-auto"
        autocomplete="off"
        placeholder="Введите пароль"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Имя</label>
      <InputText
        v-model="userData.firstName"
        class="flex-auto"
        autocomplete="off"
        placeholder="Бакберген"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Фамилия</label>
      <InputText
        v-model="userData.lastName"
        class="flex-auto"
        autocomplete="off"
        placeholder="Нурлыбек"
      />
    </div>
    <Button
      type="button"
      severity="blue"
      label="Создать"
      class="w-full h-10"
      v-ripple
      @click="createStudent"
      :disabled="isLoading"
    ></Button>
  </Dialog>
</template>

<script setup lang="ts">
import { useGroupStore } from '@/stores/group.store';
import { useUserStore } from '@/stores/user.store';
import type { User } from '@/types/user';
import { UserRole } from '@/types/user';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const groupStore = useGroupStore();
const userStore = useUserStore();
const route = useRoute();
const toast = useToast();

const isVisibleCreateStudent = ref(false);
const isLoading = ref(false);
const userData = ref({
  username: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
  groupId: +route.params.id,
  role: UserRole.STUDENT
});

onMounted(async () => {
  if (!route.params.id) return;
  await groupStore.findOne(+route.params.id);
});

async function createStudent() {
  try {
    const data = userData.value as User;
    const student = await userStore.create(data);
    groupStore.group?.students.push(student);
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Студент добавлен',
      life: 3000
    });
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка!',
      life: 3000
    });
  }
}
</script>
