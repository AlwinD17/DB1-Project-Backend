import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAdditionalServiceDTO } from '../dto/create-addService-dto';
import { AdditionalServiceFiltersDTO } from '../dto/validations.dto';
import { AdditionalServicesEntity } from '../entities/additional-services.entity';
import { BasePaginationService } from '../../common/services/base-pagination.service';
import { UUID } from 'crypto';

@Injectable()
export class AdditionalServicesService extends BasePaginationService<AdditionalServicesEntity> {
    constructor(
        @InjectRepository(AdditionalServicesEntity)
        private readonly additionalServiceRepository: Repository<AdditionalServicesEntity>,
      ) {
        super(additionalServiceRepository)
    }
    
      async create(createDto: CreateAdditionalServiceDTO): Promise<AdditionalServicesEntity> {
        const service = this.additionalServiceRepository.create(createDto);
        return this.additionalServiceRepository.save(service);
      }
    
      async findAll(
        options: IPaginationOptions,
        filters: AdditionalServiceFiltersDTO,
      ): Promise<Pagination<AdditionalServicesEntity>> {
        const queryBuilder = this.additionalServiceRepository.createQueryBuilder('additionalServices');
    

        const filterMappings = {
          name: 'additionalServices.name ILIKE :name',
          type: 'additionalServices.type = :type',
          minPrice: 'additionalServices.price >= :minPrice',
          maxPrice: 'additionalServices.price <= :maxPrice',
        };
    
        this.applyFilters(queryBuilder, filters, filterMappings);
    
        return paginate<AdditionalServicesEntity>(queryBuilder, options);
      }
    
      async findOne(id: UUID): Promise<AdditionalServicesEntity> {
        const service = await this.additionalServiceRepository.findOne({ where: { id } });
        if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
        return service;
      }
    
      async update(id: UUID, updateDto: Partial<CreateAdditionalServiceDTO>): Promise<UpdateResult|undefined > {
        const service = await this.additionalServiceRepository.update(id, updateDto)
        if (service.affected === 0) throw new NotFoundException(`Service with ID ${id} not found`);
        return service
      }
    
      async delete(id: UUID): Promise<DeleteResult> {
        const result = await this.additionalServiceRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Service with ID ${id} not found`);
        return result
      }
}
