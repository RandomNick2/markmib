import type { Journal } from '@/types/journal'
import { $authHost } from '.';
import type { LessonType } from '@/types/lesson'

export default class JournalsApi {
  static async findAll() {
    const response = await $authHost.get('/journals');
    return response.data;
  }

  static async findOne(id: string) {
    const response = await $authHost.get('/journals/' + id);
    return response.data;
  }

  static async create(data: Journal) {
    const response = await $authHost.post('/journals', data)
    return response.data
  }
}
