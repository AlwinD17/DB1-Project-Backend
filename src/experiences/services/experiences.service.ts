import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperiencesEntity } from '../entities/experiences.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { CreateExperienceDTO } from '../dtos/create-experience.dto';
import { UUID } from 'crypto';
import { ERoles } from '../../config/roles.enum';
import { BasePaginationService } from '../../common/services/base-pagination.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ExperienceFiltersDTO } from '../dtos/experience-filters.dto';
import { UpdateExperienceDTO } from '../dtos/update-experience.dto';

const filterMappings = {
    title: 'experiences.title ILIKE :title',
    location: 'experiences.location ILIKE :location',
    minPrice: 'experiences.base_price >= :minPrice',
    maxPrice: 'experiences.base_price <= :maxPrice',
    startDate: 'experiences.start_date >= :startDate',
    endDate: 'experiences.end_date <= :endDate',
  };


@Injectable()
export class ExperiencesService extends BasePaginationService<ExperiencesEntity> {
    constructor(
        @InjectRepository(ExperiencesEntity) readonly ExperiencesRepository: Repository<ExperiencesEntity>,
        @InjectRepository(UsersEntity) readonly UsersRepository: Repository<UsersEntity>
    ){
        super(ExperiencesRepository)
    }

    async createExperience(body:CreateExperienceDTO, id: UUID){
        try {
            const organizer = await this.UsersRepository.findOneBy({id, role: ERoles.ORGANIZER})
            if (!organizer) {
                throw new NotFoundException(`Organizer with ID ${id} not found.`)
            }

            const newExperience = this.ExperiencesRepository.create({
                ...body,
                organizer
            })
            return await this.ExperiencesRepository.save(newExperience)

        } catch (error) {
            throw error
        }
    }


    async findAllExperiences(options: IPaginationOptions, filters: ExperienceFiltersDTO):Promise<Pagination<ExperiencesEntity>>{
        try {
            const queryBuilder = this.ExperiencesRepository.createQueryBuilder('experiences');

            this.applyFilters(queryBuilder, filters, filterMappings);

            return this.paginate(options, queryBuilder);
          } catch (error) {
            throw new BadRequestException('Failed to find experiences.');
          }
    }

    async findExperienceById(id: UUID){
        try {
            const experience = await this.ExperiencesRepository.findOneBy({ id })
            if (!experience) {
                throw new NotFoundException(`Experience with ID ${id} not found.`)
            }
            return experience
        } catch (error) {
            throw new BadRequestException('Failed to find experience.')
        }
    }

    async findExperienceByOrganizer(
        id: UUID,
        options: IPaginationOptions,
        filters: ExperienceFiltersDTO
      ): Promise<Pagination<ExperiencesEntity>> {
        try {

          const queryBuilder = this.ExperiencesRepository.createQueryBuilder('experiences')
            .leftJoinAndSelect('experiences.organizer', 'organizer')
            .where('organizer.id = :id', { id })
            .andWhere('organizer.role = :role',{role:'organizer'})
      
          this.applyFilters(queryBuilder, filters, filterMappings);
      
          return this.paginate(options, queryBuilder);
        } catch (error) {
          throw new BadRequestException('Failed to find experiences.');
        }
      }

    async updateExperience(body: UpdateExperienceDTO,id: UUID){
        try {
            return await this.ExperiencesRepository.update(id,body)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to update experience with ID ${id}`);
        }
    }

    async deleteExperience(id:UUID){
        try {
            return await this.ExperiencesRepository.delete(id)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete experience with ID ${id}`);
        }
    }

}
