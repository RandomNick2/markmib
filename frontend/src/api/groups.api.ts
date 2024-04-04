import { $authHost } from '.'

export default class GroupApi {
  static async create(name: string) {
    const response = await $authHost.post('/groups', {
      name: name
    })
    return response.data
  }

  static async findAll() {
    const response = await $authHost.get('/groups')
    return response.data
  }

  static async findOne(id: number) {
    const response = await $authHost.get('/groups/' + id)
    return response.data
  }
}