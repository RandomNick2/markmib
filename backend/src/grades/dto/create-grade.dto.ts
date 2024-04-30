import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  value: string;
}
