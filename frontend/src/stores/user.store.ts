import { defineStore } from 'pinia'
import { get_me } from '@/http/authApi'


export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

interface User {
  username?: string
  email?: string
  name?: string
  role?: UserRole
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

export interface UserState extends User {
  isLogged: boolean
}

export interface UserStore extends UserState {
  loadUser: (token?: string) => Promise<void>
  logout: () => void
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState => ({
    username: undefined,
    email: undefined,
    name: undefined,
    role: undefined,
    firstName: undefined,
    lastName: undefined,
    avatarUrl: undefined,
    isLogged: !!localStorage.getItem('token')
  }),

  actions: {
    setUser(user: User) {
      this.username = user.username;
      this.email = user.email;
      this.name = user.name;
      this.role = user.role;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.avatarUrl = user.avatarUrl;
      this.isLogged = true;
    },
    
    async loadUser(token?: string): Promise<void> {
      if (token) {
        localStorage.setItem('token', token);
      }
      if (!this.isLogged && !token) return;

      try {
        const user = await get_me();
        this.setUser(user);
      } catch (error) {
        return
      }
    },

    logout() {
      localStorage.removeItem('token')
      this.$reset()
    }
  }
})
