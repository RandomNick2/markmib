import type { User } from './user';

export interface Speciality {
  id: number;
  name: string;
}

export interface Qualification {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  students: User[];
  speciality: Speciality;
  qualification: Qualification;
}
