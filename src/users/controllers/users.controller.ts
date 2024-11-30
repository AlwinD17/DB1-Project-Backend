import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Request } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERoles } from '../../config/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles([ERoles.ADMIN,ERoles.ORGANIZER,ERoles.TRAVELER])
  @Get('profile')
  async getProfile(@Request() req): Promise<any> {
    return this.usersService.getProfile(req.user.id);
  }

  @Roles([ERoles.ADMIN, ERoles.ORGANIZER, ERoles.TRAVELER])
  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDTO: UpdateUserDTO
  ): Promise<UpdateResult> {
    return this.usersService.updateUser(id, updateUserDTO);
  }

  @Roles([ERoles.ADMIN])
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: UUID): Promise<DeleteResult> {
    return this.usersService.deleteUser(id);
  }
}