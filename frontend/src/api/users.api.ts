import type { User, UserRole } from '@/types/user';
import { $authHost, $host } from '.';

export default class UserApi {
  static async login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    };
    const response = await $host.post('/auth/login', data);

    return response;
  }

  static async get_me() {
    const response = await $authHost.get('/auth/me');
    return response.data;
  }

  static async create(user: User) {
    const response = await $authHost.post('/users', user);
    return response.data;
  }

  static async findAll(role?: UserRole) {
    const params = {
      role: role
    };
    const response = await $authHost.get('/users', {
      params: role ? params : null
    });
    return response.data;
  }

  static async delete(id: number) {
    const response = await $authHost.delete('/users/' + id);
    return response.data
  }
}
