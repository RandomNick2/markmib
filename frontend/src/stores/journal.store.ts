import GradeApi from '@/api/grades.api';
import JournalsApi from '@/api/journals.api';
import LessonApi from '@/api/lessons.api';
import type { Journal } from '@/types/journal';
import { LessonType } from '@/types/lesson';
import { defineStore } from 'pinia';

export type Nullable<T> = T | null;

export interface JournalsState {
  journals: Journal[];
  journal?: Nullable<Journal>;
}

export const useJournalStore = defineStore({
  id: 'journals',

  state: (): JournalsState => ({
    journals: [],
    journal: null
  }),

  actions: {
    async findAll() {
      this.journals = await JournalsApi.findAll();
    },

    async findOne(id: string) {
      this.journal = await JournalsApi.findOne(id);
    },

    async create(data: Journal) {
      const journal = await JournalsApi.create(data);
      this.journals.push(journal);
      return journal;
    },

    async createLesson(journalId: number, type?: LessonType, name?: string) {
      const lesson = await LessonApi.create(journalId, type, name);
      if (!this.journal?.lessons) return;
      this.journal.lessons.push(lesson);
    },

    async createOrUpdateGrade(
      journalId: number,
      studentId: number,
      lessonId: number,
      value: string
    ) {
      const response = await GradeApi.updateOrCreate(journalId, studentId, lessonId, value);

      this.journal?.lessons?.forEach((lesson) => {
        if (lesson.id !== response.grade.lessonId) return;

        if (response.created) {
          lesson.grades.push(response.grade);
          return;
        }

        lesson.grades.forEach((grade) => {
          if (grade.id === response.grade.id) {
            grade.value = response.grade.value;
          }
        });
      });
    },

    async updateLesson(lessonId: number, name: string, type: LessonType) {
      const updatedLesson = await LessonApi.update(lessonId, type, name);

      this.journal?.lessons?.forEach((lesson) => {
        if (lesson.id === lessonId) {
          lesson.name = updatedLesson.name;
          lesson.type = updatedLesson.type;
        }
      });
    },

    async deleteLesson(lessonId: number) {
      await LessonApi.delete(lessonId);

      if (this.journal?.lessons) {
        this.journal.lessons = this.journal.lessons.filter(({ id }) => id !== lessonId);
      }
    }
  }
});
