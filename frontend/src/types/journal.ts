import type { Group } from './group';
import type { Lesson } from './lesson';
import type { User } from './user';

export interface Journal {
  id?: number;
  name?: string;
  group?: Group;
  groupId?: number;
  lessons?: Lesson[];
  teacher?: User;
  teacherId?: number;
}
