import { IsInt, IsNotEmpty, Max, Min, IsDateString } from 'class-validator';

export class CreateMarkDto {
  @IsInt()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  score: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
