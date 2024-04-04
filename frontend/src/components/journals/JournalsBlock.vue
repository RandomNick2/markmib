<template>
  <div class="wrapper mt-9">
    <h1 class="font-bold text-xl">Журналы</h1>
    <div class="table-wrapper mt-4">
      <table class="w-full">
        <thead>
          <th>Журнал</th>
          <th class="text-center">Преподаватель</th>
          <th class="text-right w-0 pl-0" v-if="userStore.role == UserRole.ADMIN">
            <Button
              class="text-white"
              :icon="PrimeIcons.PLUS"
              v-ripple
              v-tooltip.bottom="'Создать журнал'"
              @click="isVisibleCreateJournal = true"
            />
          </th>
        </thead>

        <tbody>
          <tr v-for="journal in journalsStore.journals" :key="journal.id">
            <td>{{ journal.name }}</td>
            <td class="text-center" v-if="journal.teacher">
              {{ journal.teacher.firstName }} {{ journal.teacher.lastName }}
            </td>
            <td class="text-right">
              <Button
                v-if="userStore"
                class="text-center"
                security="primary"
                v-ripple
                :icon="PrimeIcons.ARROW_RIGHT"
                @click="$router.push({ name: 'journal', params: { id: journal.id } })"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Dialog
    v-model:visible="isVisibleCreateJournal"
    modal
    header="Добавить журнал"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Название</label>
      <InputText
        v-model="journalData.name"
        class="flex-auto"
        autocomplete="off"
        placeholder="Введите название"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Группа</label>
      <Dropdown
        v-model="journalData.groupId"
        :options="groupSelectOptions"
        optionLabel="name"
        optionValue="id"
        placeholder="Выберите группу"
        class="w-full md:w-20rem"
      />
    </div>

    <div class="flex flex-col gap-3 mb-3">
      <label class="font-semibold w-6rem">Учитель</label>
      <Dropdown
        v-model="journalData.teacherId"
        :options="teacherSelectOptions"
        optionLabel="name"
        optionValue="id"
        placeholder="Выберите учителя"
        class="w-full md:w-20rem"
      />
    </div>

    <Button
      type="button"
      severity="blue"
      label="Создать"
      class="w-full h-10"
      v-ripple
      @click="createJournal"
      :disabled="isLoading"
    ></Button>
  </Dialog>
</template>

<script lang="ts" setup>
import { useGroupStore } from '@/stores/group.store';
import { useJournalStore } from '@/stores/journal.store';
import { useUserStore } from '@/stores/user.store';
import { UserRole } from '@/types/user';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const journalsStore = useJournalStore();
const groupStore = useGroupStore();
const toast = useToast();

const isVisibleCreateJournal = ref(false);
const isLoading = ref(false);
const journalData = ref({
  name: undefined,
  groupId: undefined,
  teacherId: undefined
});

onMounted(async () => {
  await journalsStore.findAll();
  if (userStore.role == UserRole.ADMIN) {
    await groupStore.findAll();
    await userStore.findAll(UserRole.TEACHER);
  }
});

const groupSelectOptions = computed(() => {
  return groupStore.groups.map(({ name, id }) => {
    return { name: name, id: id };
  });
});

const teacherSelectOptions = computed(() => {
  return userStore.users.map(({ firstName, lastName, id }) => {
    return { name: `${firstName} ${lastName}`, id: id };
  });
});

async function createJournal() {
  try {
    console.log(journalData.value);
    if (!journalData.value.groupId || !journalData.value.name)
      return toast.add({
        summary: 'Ошибка!',
        detail: 'Заполните все поля',
        life: 3000,
        severity: 'error'
      });

    await journalsStore.create(journalData.value);
    toast.add({
      summary: 'Успешно!',
      detail: 'Журнал добавлен',
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
