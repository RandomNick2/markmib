<template>
  <section class="page-section wrapper">
    <div class="page-hero">
      <div>
        <span class="page-hero__eyebrow">Журналы</span>
        <h1 class="page-hero__title">Учебные журналы</h1>
        <p class="page-hero__description">
          Просматривайте журналы, закрепленных преподавателей и быстро переходите к оценкам.
        </p>
      </div>

      <Button
        v-if="userStore.role === UserRole.ADMIN"
        label="Создать журнал"
        :icon="PrimeIcons.PLUS"
        @click="isVisibleCreateJournal = true"
      />
    </div>

    <div class="card-table">
      <table class="w-full">
        <thead>
          <tr>
            <th>Журнал</th>
            <th>Преподаватель</th>
            <th class="text-right">Действие</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="journal in journalsStore.journals" :key="journal.id">
            <td>{{ journal.name }}</td>
            <td>{{ formatTeacher(journal.teacher) }}</td>
            <td class="text-right">
              <Button
                label="Открыть"
                severity="secondary"
                :icon="PrimeIcons.ARROW_RIGHT"
                iconPos="right"
                @click="$router.push({ name: 'journal', params: { id: journal.id } })"
              />
            </td>
          </tr>
          <tr v-if="!journalsStore.journals.length">
            <td colspan="3" class="card-table__empty">Журналы пока не добавлены.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <Dialog
    v-model:visible="isVisibleCreateJournal"
    modal
    header="Добавить журнал"
    :style="{ width: '28rem' }"
  >
    <div class="form-grid">
      <div class="form-field">
        <label>Название</label>
        <InputText
          v-model="journalData.name"
          autocomplete="off"
          placeholder="Например, Математика"
        />
      </div>

      <div class="form-field">
        <label>Группа</label>
        <Dropdown
          v-model="journalData.groupId"
          :options="groupSelectOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Выберите группу"
        />
      </div>

      <div class="form-field">
        <label>Учитель</label>
        <Dropdown
          v-model="journalData.teacherId"
          :options="teacherSelectOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Выберите учителя"
        />
      </div>
    </div>

    <Button
      type="button"
      label="Создать"
      class="w-full mt-4"
      @click="createJournal"
      :loading="isLoading"
      :disabled="isLoading"
    />
  </Dialog>
</template>

<script lang="ts" setup>
import { useGroupStore } from '@/stores/group.store';
import { useJournalStore } from '@/stores/journal.store';
import { useUserStore } from '@/stores/user.store';
import { UserRole, type User } from '@/types/user';
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
  name: '',
  groupId: undefined as number | undefined,
  teacherId: undefined as number | undefined
});

onMounted(async () => {
  await journalsStore.findAll();

  if (userStore.role === UserRole.ADMIN) {
    await groupStore.findAll();
    await userStore.findAll(UserRole.TEACHER);
  }
});

const groupSelectOptions = computed(() =>
  groupStore.groups.map(({ name, id }) => ({
    name,
    id
  }))
);

const teacherSelectOptions = computed(() =>
  userStore.users.map(({ firstName, lastName, id }) => ({
    name: `${firstName} ${lastName}`,
    id
  }))
);

function formatTeacher(teacher?: User) {
  if (!teacher) return 'Не назначен';
  return `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.username || 'Не назначен';
}

async function createJournal() {
  if (isLoading.value) return;

  if (!journalData.value.groupId || !journalData.value.name.trim()) {
    toast.add({
      summary: 'Ошибка',
      detail: 'Заполните название и группу',
      life: 3000,
      severity: 'error'
    });
    return;
  }

  isLoading.value = true;

  try {
    await journalsStore.create({
      name: journalData.value.name.trim(),
      groupId: journalData.value.groupId,
      teacherId: journalData.value.teacherId
    });

    journalData.value = {
      name: '',
      groupId: undefined,
      teacherId: undefined
    };
    isVisibleCreateJournal.value = false;

    toast.add({
      summary: 'Успешно',
      detail: 'Журнал добавлен',
      life: 3000,
      severity: 'success'
    });
  } catch (e) {
    toast.add({
      summary: 'Ошибка',
      detail: 'Не удалось создать журнал',
      life: 3000,
      severity: 'error'
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
