import type { Lesson, LessonType } from '@/types/lesson';
import { $authHost } from '.';

export default class LessonApi {
  static async create(journalId: number, type?: LessonType, name?: string): Promise<Lesson> {
    const response = await $authHost.post('/lessons', {
      type, journalId, name
    });
    return response.data;
  }

  static async update(journalId: number, type: LessonType, name: string) {
    const response = await $authHost.patch('/lessons/' + journalId, {
      type, name
    });

    return response.data;
  }

  static async delete(lessonId: number) {
    const response = await $authHost.delete('/lessons/' + lessonId);
    return response.data;
  }
}
