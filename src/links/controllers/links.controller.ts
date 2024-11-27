import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateLinkDto } from '../dto/create-link.dto';
import { UpdateLinkDto } from '../dto/update-link.dto';
import { LinksService } from '../services/links.service';
import { UUID } from 'crypto';
import { ERoles } from '../../config/roles.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) {}

  @Roles([ERoles.ORGANIZER, ERoles.ADMIN])     
  @Post('/:id')
  createLink(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() createLinkDto: CreateLinkDto,
  ) {
    return this.linksService.create(id, createLinkDto);
  }


  @PublicAccess()
  @Get('/organizer/:id')
  getLinksByOrganizer(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.linksService.findByOrganizer(id);
  }


  @PublicAccess()
  @Get(':id')
  getLinkById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.linksService.findOne(id);
  }

  
  @Roles([ERoles.ORGANIZER, ERoles.ADMIN])     
  @Patch(':id')
  updateLink(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linksService.update(id, updateLinkDto);
  }

  @Roles([ERoles.ORGANIZER, ERoles.ADMIN])     
  @Delete(':id')
  deleteLink(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.linksService.remove(id);
  }
}
