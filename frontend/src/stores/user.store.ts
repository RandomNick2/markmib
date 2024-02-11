import { defineStore } from 'pinia'

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
}

export interface UserState extends User {
  isLogged: boolean
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState => ({
    username: undefined,
    email: undefined,
    name: undefined,
    role: undefined,
    isLogged: !!localStorage.getItem('token')
  }),

  actions: {
    setUser(user: User) {
      this.username = user.username;
      this.email = user.email;
      this.name = user.name;
      this.role = user.role;
      this.isLogged = true;
    },
    
    async loadUser(): Promise<void> {
      
    }
  }
})
