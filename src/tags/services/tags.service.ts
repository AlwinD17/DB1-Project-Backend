import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TagsEntity } from '../entities/tags.entity';
import { UUID } from 'crypto';
import { CreateTagDTO } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
  ) {}

  // Crear un nuevo tag
  async create(body: CreateTagDTO): Promise<TagsEntity> {
    const { tag } = body
    const existingTag = await this.tagsRepository.findOne({ where: { tag } });
    if (existingTag) throw new BadRequestException(`Tag "${tag}" already exists`);

    const newTag = this.tagsRepository.create(body);
    return this.tagsRepository.save(newTag);
  }

  // Listar todos los tags
  async findAll(): Promise<TagsEntity[]> {
    return this.tagsRepository.find();
  }

  // Buscar un tag por ID
  async findOne(id: UUID): Promise<TagsEntity> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException(`Tag with ID ${id} not found`);
    return tag;
  }

  // Actualizar un tag por ID
  async update(id: UUID, body: CreateTagDTO): Promise<UpdateResult> {
     const result =  await this.tagsRepository.update(id, body)
     if (result.affected === 0) throw new NotFoundException(`Tag with ID ${id} not found`);
     return result
  }

  // Eliminar un tag por ID
  async delete(id: UUID): Promise<DeleteResult> {
    const result = await this.tagsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Tag with ID ${id} not found`);
    return result
  }
}