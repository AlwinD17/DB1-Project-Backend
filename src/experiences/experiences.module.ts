import { Module } from '@nestjs/common';
import { ExperiencesService } from './services/experiences.service';
import { ExperiencesController } from './controllers/experiences.controller';
import { UsersEntity } from '../users/entities/users.entity';
import { ExperiencesEntity } from './entities/experiences.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalServicesEntity } from '../additional-services/entities/additional-services.entity';
import { BookingEntity } from '../booking/entities/booking.entity';
import { TagsEntity } from '../tags/entities/tags.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ ExperiencesEntity, UsersEntity, AdditionalServicesEntity, BookingEntity, TagsEntity]),
  ],
  providers: [ExperiencesService],
  controllers: [ExperiencesController]
})
export class ExperiencesModule {}
