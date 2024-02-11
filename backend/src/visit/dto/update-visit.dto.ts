import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateVisitDto {
  @IsBoolean()
  @IsNotEmpty()
  visited: boolean;
}
