import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @IsNotEmpty()
  @IsNumber()
  teacherId: number;
}
