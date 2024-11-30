import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperiencesEntity } from '../entities/experiences.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { CreateExperienceDTO } from '../dtos/create-experience.dto';
import { UUID } from 'crypto';
import { ERoles } from '../../config/roles.enum';
import { BasePaginationService } from '../../common/services/base-pagination.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ExperienceFiltersDTO } from '../dtos/experience-filters.dto';
import { UpdateExperienceDTO } from '../dtos/update-experience.dto';
import { TagsEntity } from '../../tags/entities/tags.entity';

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
        @InjectRepository(UsersEntity) readonly UsersRepository: Repository<UsersEntity>,
        @InjectRepository(TagsEntity) readonly TagsRepository: Repository<TagsEntity>
    ){
        super(ExperiencesRepository)
    }

    async createExperience(body:CreateExperienceDTO){
        try {
            const {organizer, tags,...bodyData} = body
            const organizerEntity = await this.UsersRepository.findOneBy({id: organizer, role: ERoles.ORGANIZER})
            if (!organizerEntity) {
                throw new NotFoundException(`Organizer with ID ${organizer} not found.`)
            }
            const existingTags = await this.TagsRepository.findBy({ tag: In(tags) }); 
            const existingTagNames = existingTags.map((tag) => tag.tag); 
        
            const newTags = tags
              .filter((tag) => !existingTagNames.includes(tag)) 
              .map((tag) => this.TagsRepository.create({ tag })); 
        
            if (newTags.length) {
              await this.TagsRepository.save(newTags)
            }
        
            const allTags = [...existingTags, ...newTags]; 
        
            const newExperience = this.ExperiencesRepository.create({
              ...bodyData,
              organizer: organizerEntity,
              tags: allTags,
            });

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
            const experience = await this.ExperiencesRepository.createQueryBuilder('experience')
            .leftJoinAndSelect('experience.tags', 'tags')
            .where('experience.id = :id',{id})
            .getOne()
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
          const organizer = await this.UsersRepository.findOneBy({id, role: ERoles.ORGANIZER})

          const queryBuilder = this.ExperiencesRepository.createQueryBuilder('experiences')
            .where('experiences.organizer = :organizer', { organizer })
      
          this.applyFilters(queryBuilder, filters, filterMappings);
      
          return this.paginate(options, queryBuilder);
        } catch (error) {
          throw new BadRequestException('Failed to find experiences.');
        }
      }

    async updateExperience(body: UpdateExperienceDTO,id: UUID): Promise<ExperiencesEntity>{
        try {
            // Validar si la experiencia existe
            const existingExperience = await this.ExperiencesRepository.findOne({
                where: { id },
                relations: ['tags'], // Incluye las relaciones necesarias
              });
              
              if (!existingExperience) {
                throw new NotFoundException(`Experience with ID ${id} not found.`);
              }
              
              // Manejar los tags si están incluidos en el body
              const { organizer, tags, ...bodyData } = body;
              
              if (tags) {
                const existingTags = await this.TagsRepository.findBy({ tag: In(tags) });
                const existingTagNames = existingTags.map((tag) => tag.tag);
              
                const newTags = tags
                  .filter((tag) => !existingTagNames.includes(tag))
                  .map((tag) => this.TagsRepository.create({ tag }));
              
                if (newTags.length) {
                  await this.TagsRepository.save(newTags);
                }
              
                const allTags = [...existingTags, ...newTags];
              
                // Actualizar la relación de tags en la experiencia
                existingExperience.tags = allTags;
              }
              
              // Actualizar los datos de la experiencia
              Object.assign(existingExperience, bodyData);
              
              await this.ExperiencesRepository.save(existingExperience);
              
              return existingExperience;
          } catch (error) {
            throw new InternalServerErrorException(`Failed to update experience with ID ${id}: ${error.message}`);
          }
    }

    async deleteExperience(id:UUID): Promise<DeleteResult>{
        try {
            return await this.ExperiencesRepository.delete(id)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete experience with ID ${id}`);
        }
    }

}
