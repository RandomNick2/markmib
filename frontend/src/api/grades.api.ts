import { $authHost } from '.'

export default class GradeApi {
  static async updateOrCreate(journalId: number, studentId: number, lessonId: number, value: string) {
    const response = await $authHost.post('/grades', {
      journalId: journalId,
      studentId: studentId,
      lessonId: lessonId,
      value: value
    })

    return response.data
  }
}
