import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { TagsEntity } from './entities/tags.entity';
import { ExperiencesEntity } from '../experiences/entities/experiences.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([TagsEntity, ExperiencesEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
