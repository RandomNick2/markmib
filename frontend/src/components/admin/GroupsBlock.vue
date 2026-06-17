<template>
  <div class="wrapper mt-9">
    <h1 class="font-bold text-xl">Группы</h1>
    <div class="table-wrapper mt-4">
      <table class="w-full">
        <thead>
          <th>Название</th>
          <th>Специальность</th>
          <th>Квалификация</th>
          <th class="text-right w-0 pl-0" v-if="userStore.role == UserRole.ADMIN">
            <Button
              class="group-create-button"
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
            <td>{{ group.speciality.name }}</td>
            <td>{{ group.qualification.name }}</td>
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
      <InputText v-model="state.groupName" class="flex-auto" autocomplete="off" placeholder="ПОБ-11" />

      <label class="font-semibold w-6rem">Специальность</label>
      <Dropdown
        v-model="state.groupSpecialityId"
        :options="groupStore.speciality"
        optionLabel="name"
        optionValue="id"
        placeholder="Выберите специальность"
        class="w-full md:w-20rem"
      />

      <label class="font-semibold w-6rem">Квалификация</label>
      <Dropdown
        v-model="state.groupQualificationId"
        :options="groupStore.qualification"
        optionLabel="name"
        optionValue="id"
        placeholder="Выберите квалицификацию"
        class="w-full md:w-20rem"
      />
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
import { onMounted, ref, reactive } from 'vue';
import { UserRole } from '@/types/user';

const toast = useToast();
const groupStore = useGroupStore();
const userStore = useUserStore();

const isVisibleCreateGroup = ref(false);
const state = reactive({
  groupName: '',
  groupSpecialityId: '',
  groupQualificationId: ''
});
const isLoading = ref(false);


onMounted(async () => {
  await groupStore.findAll();
  await groupStore.findSpeciality();
  await groupStore.findQualification();
});

async function createGroup() {
  try {
    isLoading.value = true;
    await groupStore.create(state.groupName, +state.groupQualificationId, +state.groupSpecialityId);
    state.groupName = '';
    state.groupQualificationId = '';
    state.groupSpecialityId = '';
    isLoading.value = false;
    toast.add({
      summary: 'Успешно!',
      detail: 'Группа добавлена',
      life: 3000,
      severity: 'success'
    });
  } catch (e) {
    console.log(e)
    toast.add({
      summary: 'Ошибка!',
      life: 3000,
      severity: 'error'
    });
  }
}
</script>

<style scoped lang="scss">
.group-create-button {
  background: linear-gradient(135deg, #0f766e, #0ea5e9);
  border: none;
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(14, 165, 233, 0.18);
}

.group-create-button :deep(.pi) {
  color: #ffffff;
}
</style>
