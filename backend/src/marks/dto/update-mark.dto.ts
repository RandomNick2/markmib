import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class UpdateMarkDto {
  @IsInt()
  @IsNotEmpty()
  mark_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  score: number;
}
