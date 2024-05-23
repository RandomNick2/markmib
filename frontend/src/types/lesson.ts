import type { Grade } from './grade'

export enum LessonType {
  DEFAULT = "DEFAULT",
  RO = "RO",
  EXAM = "EXAM",
  FINAL = "FINAL"
}

export const LessonTypeLocalize = {
  [LessonType.DEFAULT]: "Default",
  [LessonType.RO]: "РО",
  [LessonType.EXAM]: "Экзамен",
  [LessonType.FINAL]: "Итоговый"
}

export interface Lesson { 
  id: number;
  type: LessonType;
  name: string;
  grades: Grade[]
}