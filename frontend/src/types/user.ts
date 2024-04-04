export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface User {
  id?: number;
  username?: string
  role?: UserRole
  groupId?: number;
  firstName?: string
  lastName?: string
}