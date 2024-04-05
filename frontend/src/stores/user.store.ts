import UserApi from '@/api/users.api'
import type { User, UserRole } from '@/types/user'
import { defineStore } from 'pinia'

export interface UserState extends User {
  isLogged: boolean;
  users: User[];
}

export interface UserStore extends UserState {
  loadUser: (token?: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState => ({
    isLogged: !!localStorage.getItem('token'),
    users: []
  }),

  actions: {
    setUser(user: User) {
      this.username = user.username;
      this.role = user.role;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.isLogged = true;
    },

    async loadUser(token?: string): Promise<void> {
      if (token) {
        localStorage.setItem('token', token);
      }
      if (!token && !this.isLogged) return;

      try {
        const user = await UserApi.get_me();
        this.setUser(user);
      } catch (error) {
        localStorage.removeItem('token');
        this.isLogged = false;
        return;
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.$reset();
    },

    async create(data: User) {
      const response = await UserApi.create(data);
      this.users.push(response);
      return response;
    },

    async findAll(role?: UserRole) {
      const response = await UserApi.findAll(role);
      this.users = response;
    },

    async deleteUser(userId: number) {
      await UserApi.delete(userId);
      this.users = this.users.filter(({ id }) => {
        return id != userId
      })
    }
  }
});
