import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CreateAdditionalServiceDTO } from '../dto/create-addService-dto';
import { AdditionalServiceFiltersDTO } from '../dto/validations.dto';
import { AdditionalServicesEntity } from '../entities/additional-services.entity';
import { AdditionalServicesService } from '../services/additional-services.service';
import { UUID } from 'crypto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('additional-services')
export class AdditionalServicesController {
  constructor(private readonly service: AdditionalServicesService) {}

  @Post()
  create(@Body() createDto: CreateAdditionalServiceDTO): Promise<AdditionalServicesEntity> {
    return this.service.create(createDto);
  }

  @Get()
  findAll(
    @Query() options: IPaginationOptions,
    @Query() filters: AdditionalServiceFiltersDTO,
  ): Promise<Pagination<AdditionalServicesEntity>> {
    return this.service.findAll(options, filters);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<AdditionalServicesEntity> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: Partial<CreateAdditionalServiceDTO>,
  ): Promise<UpdateResult> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}