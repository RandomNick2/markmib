import { LessonType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsEnum(LessonType)
  type: LessonType;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  journalId: number;
}
