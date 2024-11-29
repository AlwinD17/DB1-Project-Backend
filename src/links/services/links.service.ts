import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { CreateLinkDto } from '../dto/create-link.dto';
import { UpdateLinkDto } from '../dto/update-link.dto';
import { LinksEntity } from '../entities/links.entity';
import { UUID } from 'crypto';
import { ERoles } from '../../config/roles.enum';

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(LinksEntity)
        private readonly linksRepository: Repository<LinksEntity>,
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
      ) {}
    
      async create(createLinkDto: CreateLinkDto) {
        const {organizer, ...bodyData}= createLinkDto
        const organizerEntity = await this.usersRepository.findOne({
          where: { id: organizer, role: ERoles.ORGANIZER },
        });
    
        if (!organizerEntity) {
          throw new NotFoundException(`Organizer with ID ${organizer} not found`);
        }
    
        const link = this.linksRepository.create({ ...bodyData, organizer: organizerEntity });
        return this.linksRepository.save(link);
      }
    
      async findByOrganizer(organizerId: UUID) {
        const organizer = await this.usersRepository.findOne({
          where: { id: organizerId, role: 'organizer' },
          relations: ['social_media_links'],
        });
    
        if (!organizer) {
          throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
        }
    
        return organizer.social_media_links;
      }
    
      async findOne(id: UUID) {
        const link = await this.linksRepository.findOne({
          where: { id },
          relations: ['organizer'],
        });
    
        if (!link) {
          throw new NotFoundException(`Link with ID ${id} not found`);
        }
    
        return link;
      }
    
      async update(id: UUID, updateLinkDto: UpdateLinkDto) {
        const link = await this.linksRepository.findOne({ where: { id } });
    
        if (!link) {
          throw new NotFoundException(`Link with ID ${id} not found`);
        }
    
        Object.assign(link, updateLinkDto);
        return this.linksRepository.save(link);
      }
    
      async remove(id: UUID) {
        const link = await this.linksRepository.findOne({ where: { id } });
    
        if (!link) {
          throw new NotFoundException(`Link with ID ${id} not found`);
        }
    
        return this.linksRepository.remove(link);
      }
}
