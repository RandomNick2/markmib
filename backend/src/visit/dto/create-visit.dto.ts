import { IsNotEmpty, IsInt, IsBoolean } from 'class-validator';

export class CreateVisitDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsBoolean()
  @IsNotEmpty()
  visited: boolean;
}
