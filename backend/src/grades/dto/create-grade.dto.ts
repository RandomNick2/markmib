import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGradeDto {
  @IsNotEmpty()
  @IsNumber()
  journalId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  lessonId: number;

  @IsNotEmpty()
  @IsString()
  value: string;
}
