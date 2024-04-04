import type { Grade } from './grade'

export enum LessonType {
  DEFAULT = "DEFAULT",
  RO = "RO"
}

export interface Lesson { 
  id: number;
  type: LessonType;
  name: string;
  grades: Grade[]
}