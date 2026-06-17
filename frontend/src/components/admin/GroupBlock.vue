<template>
  <div class="group" v-if="groupStore.group">
    <div class="wrapper mt-9">
      <h1 class="font-bold text-xl">Группа: {{ groupStore.group.name }}</h1>
      <div class="table-wrapper mt-4">
        <table class="w-full">
          <thead>
            <th>Аватар</th>
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
              <td>
                <Avatar :image="student.avatar" size="large" shape="circle" />
              </td>
              <td>{{ student.firstName }} {{ student.lastName }}</td>
              <td>
                <EditUserModal v-model:userId="student.id" />
              </td>
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
      <label class="font-semibold w-6rem">Аватар</label>

      <FileUpload
        mode="basic"
        name="demo[]"
        accept="image/*"
        :auto="true"
        customUpload
        @uploader="customBase64Uploader"
      />
    </div>

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
import Avatar from 'primevue/avatar';
import FileUpload from 'primevue/fileupload';
import { useGroupStore } from '@/stores/group.store';
import { useUserStore } from '@/stores/user.store';
import { UserRole } from '@/types/user';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import EditUserModal from './EditUserModal.vue';

const groupStore = useGroupStore();
const userStore = useUserStore();
const route = useRoute();
const toast = useToast();

const isVisibleCreateStudent = ref(false);
const isLoading = ref(false);
const userData = reactive({
  username: '',
  password: '',
  avatar: '',
  firstName: '',
  lastName: '',
  groupId: +route.params.id,
  role: UserRole.STUDENT
});

onMounted(async () => {
  if (!route.params.id) return;
  await groupStore.findOne(+route.params.id);
});

function customBase64Uploader(file: any) {
  var reader = new FileReader();
  reader.onloadend = () => {
    // @ts-ignore
    userData.avatar = reader.result;
    console.log(userData.avatar);
  };
  reader.readAsDataURL(file.files[0]);
}

async function createStudent() {
  try {
    const student = await userStore.create(userData);
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
