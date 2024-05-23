export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export type Nullable<T> = T | null;

export interface User {
  id: number;
  avatar?: string;
  username?: string;
  role?: UserRole;
  groupId?: number;
  firstName?: string;
  lastName?: string;
}
