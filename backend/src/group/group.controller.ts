import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddUserGroupDto } from './dto/add-user-group.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupService.create(createGroupDto);
  }

  @Get('all')
  @Roles(UserRole.TEACHER)
  async allGroups() {
    return this.groupService.getGroups();
  }

  @Get(':id')
  @Roles(UserRole.TEACHER)
  async findOne(@Param('id') id: string) {
    return await this.groupService.findOne(+id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    await this.groupService.remove(+id);
    return;
  }

  @Put()
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  async addUser(@Body() addUserGroupDto: AddUserGroupDto) {
    return this.groupService.addUserGroup(addUserGroupDto);
  }
}
