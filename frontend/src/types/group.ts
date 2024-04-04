import type { User } from './user'

export interface Group { 
  id: number;
  name: string;
  students: User[]
}