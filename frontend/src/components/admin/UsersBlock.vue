<template>
  <div class="wrapper mt-9">
    <h1 class="font-bold text-xl">Пользователи</h1>
    <div class="table-wrapper mt-4">
      <ContextMenu ref="userMenu" :model="userMenuItems" />

      <table class="w-full">
        <thead>
          <th>ID</th>
          <th class="text-center">ФИО</th>
          <th class="text-center">Роль</th>
          <th class="w-0">
            <Button
              class="user-create-button"
              :icon="PrimeIcons.PLUS"
              v-ripple
              v-tooltip.bottom="'Создать пользователя'"
              @click="isVisibleCreateUser = true"
            />
          </th>
        </thead>

        <tbody>
          <tr
            v-for="user in userStore.users"
            :key="user.id"
            @contextmenu="onUserRightClick($event, user.id)"
          >
            <td>{{ user.id }}</td>
            <td class="text-center">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="text-center">{{ user.role }}</td>
            <td></td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>

  <Dialog
    v-model:visible="isVisibleCreateUser"
    modal
    header="Создать пользователя"
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
        placeholder="Имя"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Фамилия</label>
      <InputText
        v-model="userData.lastName"
        class="flex-auto"
        autocomplete="off"
        placeholder="Фамилия"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Роль</label>
      <Dropdown
        v-model="userData.role"
        :options="userRolesArray"
        placeholder="Выберите роль"
        class="w-full md:w-20rem"
      />
    </div>

    <Button
      type="button"
      severity="blue"
      label="Создать"
      class="w-full h-10"
      v-ripple
      @click="createUser"
      :disabled="isLoading"
    ></Button>
  </Dialog>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { UserRole } from '@/types/user';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import FileUpload from 'primevue/fileupload';

const userStore = useUserStore();
const toast = useToast();

const isVisibleCreateUser = ref(false);
const isLoading = ref(false);
const userData = ref({
  username: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
  role: undefined
});

const userMenu = ref();
const userMenuItems = ref([
  {
    label: 'Удалить',
    icon: PrimeIcons.TRASH,
    command: async () => {
      await userStore.deleteUser(selectedUser.value);
      toast.add({
        severity: 'success',
        life: 3000,
        summary: 'Успешно!',
        detail: 'Урок удалён'
      });
    }
  }
]);
const selectedUser = ref();

onMounted(async () => {
  await userStore.findAll();
});

const userRolesArray: UserRole[] = Object.values(UserRole);

const onUserRightClick = (event: Event, lessonId: number) => {
  selectedUser.value = lessonId;
  userMenu.value.show(event);
};

async function createUser() {
  isLoading.value = true;
  try {
    // eslint-ignore
    // @ts-ignore
    await userStore.create(userData.value);
    toast.add({
      life: 3000,
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Пользователь создан'
    });
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Логин занят',
      life: 3000
    });
  }
  isLoading.value = false;
}
</script>

<style scoped lang="scss">
.user-create-button {
  background: linear-gradient(135deg, #0f766e, #0ea5e9);
  border: none;
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(14, 165, 233, 0.18);
}

.user-create-button :deep(.pi) {
  color: #ffffff;
}
</style>
