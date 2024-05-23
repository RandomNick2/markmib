import { $authHost } from '.';

export default class GroupApi {
  static async create(name: string, qualificationId: number, specialityId: number) {
    const response = await $authHost.post('/groups', { name, specialityId, qualificationId });
    return response.data;
  }

  static async findAll() {
    const response = await $authHost.get('/groups');
    return response.data;
  }

  static async findOne(id: number) {
    const response = await $authHost.get('/groups/' + id);
    return response.data;
  }

  static async findSpeciality() {
    const response = await $authHost.get('/groups/speciality');
    return response.data;
  }

  static async findQualification() {
    const response = await $authHost.get('/groups/qualification');
    return response.data;
  }
}
