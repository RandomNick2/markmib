import { IsInt, IsNotEmpty } from 'class-validator';

export class AddUserGroupDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  group_id: number;
}
