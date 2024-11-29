import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateLinkDto } from '../dto/create-link.dto';
import { UpdateLinkDto } from '../dto/update-link.dto';
import { LinksService } from '../services/links.service';
import { UUID } from 'crypto';
import { ERoles } from '../../config/roles.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Links')
@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) { }

    @Roles([ERoles.ORGANIZER, ERoles.ADMIN])
    @Post('/:id')
    @ApiOperation({ summary: 'Create a new link for an organizer' })
    @ApiResponse({
        status: 201,
        description: 'Link successfully created',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Organizer not found' })
    createLink(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Body() createLinkDto: CreateLinkDto,
    ) {
        return this.linksService.create(id, createLinkDto);
    }


    @PublicAccess()
    @Get('/organizer/:id')
    @ApiOperation({ summary: 'Get all links for a specific organizer' })
    @ApiResponse({
        status: 200,
        description: 'List of links for the organizer',
    })
    @ApiResponse({ status: 404, description: 'Organizer not found' })
    getLinksByOrganizer(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.linksService.findByOrganizer(id);
    }


    @PublicAccess()
    @Get(':id')
    @ApiOperation({ summary: 'Get a link by its ID' })
    @ApiResponse({
        status: 200,
        description: 'Link details',
    })
    @ApiResponse({ status: 404, description: 'Link not found' })
    @PublicAccess()
    getLinkById(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.linksService.findOne(id);
    }


    @Roles([ERoles.ORGANIZER, ERoles.ADMIN])
    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing link' })
    @ApiResponse({
        status: 200,
        description: 'Link successfully updated',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Link not found' })
    updateLink(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Body() updateLinkDto: UpdateLinkDto,
    ) {
        return this.linksService.update(id, updateLinkDto);
    }

    @Roles([ERoles.ORGANIZER, ERoles.ADMIN])
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a link by its ID' })
    @ApiResponse({
        status: 200,
        description: 'Link successfully deleted',
    })
    @ApiResponse({ status: 404, description: 'Link not found' })
    deleteLink(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.linksService.remove(id);
    }
}
