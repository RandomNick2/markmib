import UserApi from '@/api/users.api';
import type { User, UserRole } from '@/types/user';
import { defineStore } from 'pinia';

export interface UserState extends User {
  isLogged: boolean;
  users: User[];
  hydrated: boolean;
}

export interface UserStore extends UserState {
  loadUser: (token?: string) => Promise<void>;
  logout: () => void;
}

const initialState = (): UserState => ({
  isLogged: !!localStorage.getItem('token'),
  users: [],
  hydrated: false,
  id: 0,
  username: '',
  role: undefined,
  groupId: undefined,
  firstName: '',
  lastName: '',
  avatar: ''
});

export const useUserStore = defineStore({
  id: 'user',

  state: initialState,

  actions: {
    setUser(user: User) {
      this.id = user.id;
      this.username = user.username;
      this.role = user.role;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.avatar = user.avatar;
      this.groupId = user.groupId;
      this.isLogged = true;
      this.hydrated = true;
    },

    async loadUser(token?: string): Promise<void> {
      if (token) {
        localStorage.setItem('token', token);
        this.isLogged = true;
      }

      if (!token && !localStorage.getItem('token')) {
        this.hydrated = true;
        this.isLogged = false;
        return;
      }

      if (this.hydrated && !token) return;

      try {
        const user = await UserApi.get_me();
        this.setUser(user);
      } catch (error) {
        localStorage.removeItem('token');
        this.$patch({
          ...initialState(),
          hydrated: true,
          isLogged: false
        });
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.$patch(initialState());
    },

    async create(data: object) {
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
      this.users = this.users.filter(({ id }) => id !== userId);
    }
  }
});
