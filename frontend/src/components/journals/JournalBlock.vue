<template>
  <div class="wrapper mt-9" v-if="journalStore.journal && journalStore.journal.group">
    <h1 class="font-bold text-xl">Журнал: {{ journalStore.journal.name }}</h1>
    <h2 class="font-bold text-xl" v-if="userStore.role != UserRole.STUDENT">
      Не забудьте нажать ENTER после того как что то изменили
    </h2>
    <div class="table-wrapper mt-4">
      <table class="w-full">
        <thead>
          <th v-if="userStore.role != UserRole.STUDENT">Студент</th>
          <th
            v-for="lesson in journalStore.journal?.lessons"
            class="max-w-40 inline-block"
            :key="lesson.id"
          >
            <input
              type="text"
              :value="formatLessonName(lesson.name)"
              :readonly="userStore.role == UserRole.STUDENT"
              @change="updateLessonName(lesson.id, $event)"
            />
          </th>
          <th class="text-right w-0 pl-0" v-if="userStore.role != UserRole.STUDENT">
            <Button
              class="text-white"
              :icon="PrimeIcons.PLUS"
              v-ripple
              @click="createLesson"
              v-tooltip.bottom="'Создать урок'"
            />
          </th>
        </thead>
        <tbody v-if="userStore.role != UserRole.STUDENT">
          <tr v-for="student in journalStore.journal?.group.students" :key="student.id">
            <td class="w-60">{{ student.firstName }} {{ student.lastName }}</td>
            <td
              v-for="lesson in journalStore.journal?.lessons"
              :key="lesson.id"
              class="max-w-40 inline-block"
            >
              <input
                type="text"
                :value="getGrade(student?.id, lesson)"
                @change="updateOrCreateGrade(student.id, lesson.id, $event)"
                v-if="student.id"
              />
            </td>
            <td></td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td
              v-for="lesson in journalStore.journal?.lessons"
              :key="lesson.id"
              class="max-w-40 inline-block"
            >
              <input type="text" :value="getGrade(student?.id, lesson)" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJournalStore } from '@/stores/journal.store';
import { useUserStore } from '@/stores/user.store';
import { LessonType, type Lesson } from '@/types/lesson';
import { UserRole } from '@/types/user';
import { PrimeIcons } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import './journal.scss';

const journalStore = useJournalStore();
const userStore = useUserStore();
const route = useRoute();
const toast = useToast();
const student = ref();

onMounted(async () => {
  if (typeof route.params.id !== 'string') return;
  await journalStore.findOne(route.params.id);
  if (userStore.role == UserRole.STUDENT) {
    student.value = journalStore.journal?.group?.students[0];
  }
});

function formatLessonName(name: string) {
  const date = new Date(name);
  const formatedName = date.toLocaleString('ru-RU', {
    dateStyle: 'short'
  });
  if (formatedName === 'Invalid Date') return name;
  return formatedName;
}

function getGrade(studentId: number | undefined, lesson: Lesson) {
  // Получаем оценку для данного пользователя и даты урока
  const grade = lesson.grades.find((g) => g.studentId === studentId);
  return grade?.value;
}

async function createLesson() {
  if (!journalStore.journal || !journalStore.journal.id || !journalStore.journal.lessons) return;
  try {
    const date = new Date();
    await journalStore.createLesson(+route.params.id, LessonType.DEFAULT, date.toISOString());

    toast.add({
      summary: 'Успешно!',
      detail: 'Новый ряд создан',
      severity: 'success',
      life: 3000
    });
  } catch (e) {
    toast.add({
      summary: 'Ошибка!',
      severity: 'error',
      life: 3000
    });
  }
}

async function updateOrCreateGrade(studentId: number, lessonId: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  try {
    await journalStore.createOrUpdateGrade(+route.params.id, studentId, lessonId, value);
    toast.add({
      life: 3000,
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Оценка сохранена'
    });
  } catch (e) {
    toast.add({
      severity: 'error',
      life: 3000,
      summary: 'Ошибка!'
    });
  }
}

async function updateLessonName(lessonId: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const name = input.value;

  try {
    await journalStore.updateLessonName(lessonId, name);
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Изменения сохранены',
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
