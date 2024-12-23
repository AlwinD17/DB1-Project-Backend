import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UUID } from 'crypto';
import { TagsEntity } from '../entities/tags.entity';
import { TagsService } from '../services/tags.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTagDTO } from '../dtos/create-tag.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERoles } from '../../config/roles.enum';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Roles([ERoles.ORGANIZER, ERoles.ADMIN])
  @Post()
  create(@Body('tag') tag: string): Promise<TagsEntity> {
    return this.tagsService.create(tag);
  }

  @PublicAccess()
  @Get()
  findAll(): Promise<TagsEntity[]> {
    return this.tagsService.findAll();
  }

  @PublicAccess()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<TagsEntity> {
    return this.tagsService.findOne(id);
  }

  @Roles([ERoles.ADMIN])
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body('tag') tag: string): Promise<UpdateResult> {
    return this.tagsService.update(id, tag);
  }

  @Roles([ERoles.ADMIN])
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<DeleteResult> {
    return this.tagsService.delete(id);
  }
}