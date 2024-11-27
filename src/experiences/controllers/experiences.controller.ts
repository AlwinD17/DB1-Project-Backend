import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ExperienceFiltersDTO } from '../dtos/experience-filters.dto';
import { ExperiencesEntity } from '../entities/experiences.entity';
import { ExperiencesService } from '../services/experiences.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExperienceDTO } from '../dtos/create-experience.dto';
import { UpdateExperienceDTO } from '../dtos/update-experience.dto';
import { UUID } from 'crypto';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERoles } from '../../config/roles.enum';

@ApiTags('Experiences')
@Controller('experiences')
export class ExperiencesController {
    constructor(private readonly experiencesService: ExperiencesService) { }


    @Roles([ERoles.ADMIN, ERoles.ORGANIZER])
    @Post(':id')
    @ApiOperation({
        summary: 'Create a new experience',
        description: 'Allows an organizer to create a new experience.',
    })
    @ApiBody({
        description: 'Details of the experience to be created.',
        type: CreateExperienceDTO,
    })
    @ApiParam({
        name: 'id',
        description: 'UUID of the organizer creating the experience.',
        type: String,
    })
    @ApiResponse({ status: 201, description: 'Experience created successfully.' })
    @ApiResponse({ status: 404, description: 'Organizer not found.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    async createExperience(
        @Body() body: CreateExperienceDTO,
        @Param('id', ParseUUIDPipe) id: UUID
    ): Promise<ExperiencesEntity> {
        try {
            return await this.experiencesService.createExperience(body, id);
        } catch (error) {
            throw error;
        }
    }



    @PublicAccess()
    @Get()
    @ApiOperation({
        summary: 'Retrieve all experiences',
        description: 'Retrieve a paginated list of experiences with optional filters.',
    })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number for pagination.' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page.' })
    @ApiQuery({ name: 'title', type: String, required: false, description: 'Filter experiences by title.' })
    @ApiQuery({ name: 'location', type: String, required: false, description: 'Filter experiences by location.' })
    @ApiQuery({ name: 'minPrice', type: Number, required: false, description: 'Filter experiences with a minimum base price.' })
    @ApiQuery({ name: 'startDate', type: String, required: false, description: 'Filter experiences with a start date after the specified value.' })
    @ApiResponse({ status: 200, description: 'Experiences retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request or filter parameters.' })
    async findAllExperiences(
        @Query() options: IPaginationOptions,
        @Query() filters: ExperienceFiltersDTO,
    ): Promise<Pagination<ExperiencesEntity>> {
        try {
            return await this.experiencesService.findAllExperiences(options, filters);
        } catch (error) {
            throw error;
        }
    }


    
    @PublicAccess()
    @Get(':id')
    @ApiOperation({
        summary: 'Get experience by ID',
        description: 'Retrieve details of a specific experience by its ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID of the experience.',
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Experience retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Experience not found.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    async findExperienceById(@Param('id', ParseUUIDPipe) id: UUID): Promise<ExperiencesEntity> {
        try {
            return await this.experiencesService.findExperienceById(id);
        } catch (error) {
            throw error;
        }
    }




    @PublicAccess()
    @Get('organizer/:id')
    @ApiOperation({
        summary: 'Get experiences by organizer',
        description: 'Retrieve all experiences associated with a specific organizer, with support for pagination and filters.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID of the organizer.',
        type: String,
        required: true,
    })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number for pagination.' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page.' })
    @ApiQuery({ name: 'title', type: String, required: false, description: 'Filter experiences by title.' })
    @ApiQuery({ name: 'location', type: String, required: false, description: 'Filter experiences by location.' })
    @ApiQuery({ name: 'minPrice', type: Number, required: false, description: 'Filter experiences with a minimum base price.' })
    @ApiQuery({ name: 'startDate', type: String, required: false, description: 'Filter experiences with a start date after the specified value.' })
    @ApiResponse({ status: 200, description: 'Experiences retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Organizer or experiences not found.' })
    @ApiResponse({ status: 400, description: 'Invalid request or filter parameters.' })
    async findExperienceByOrganizer(
        @Param('id') id: UUID,
        @Query() options: IPaginationOptions,
        @Query() filters: ExperienceFiltersDTO
    ) {
        try {
            return await this.experiencesService.findExperienceByOrganizer(id, options, filters);
        } catch (error) {
           throw error 
        }
    }




    @Roles([ERoles.ADMIN, ERoles.ORGANIZER])
    @Patch(':id')
    @ApiOperation({
        summary: 'Update an experience',
        description: 'Update details of an existing experience.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID of the experience to be updated.',
        type: String,
    })
    @ApiBody({
        description: 'Details to update in the experience.',
        type: UpdateExperienceDTO,
    })
    @ApiResponse({ status: 200, description: 'Experience updated successfully.' })
    @ApiResponse({ status: 404, description: 'Experience not found.' })
    @ApiResponse({ status: 400, description: 'Validation error or invalid request.' })
    async updateExperience(
        @Body() body: UpdateExperienceDTO,
        @Param('id', ParseUUIDPipe) id: UUID
    ): Promise<void> {
        try {
            const result = await this.experiencesService.updateExperience(body, id);
            if (!result.affected) {
                throw new NotFoundException(`Experience with ID ${id} not found.`);
            }
        } catch (error) {
            throw error;
        }
    }



    @Roles([ERoles.ADMIN, ERoles.ORGANIZER])
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete an experience',
        description: 'Remove an experience by its ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID of the experience to be deleted.',
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Experience deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Experience not found.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    async deleteExperience(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
        try {
            const result = await this.experiencesService.deleteExperience(id);
            if (!result.affected) {
                throw new NotFoundException(`Experience with ID ${id} not found.`);
            }
        } catch (error) {
            throw error;
        }
    }
}
