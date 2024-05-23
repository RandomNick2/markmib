import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  specialityId: number;

  @IsNotEmpty()
  @IsNumber()
  qualificationId: number;
}
