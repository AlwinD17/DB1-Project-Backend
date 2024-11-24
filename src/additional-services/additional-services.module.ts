import { Module } from '@nestjs/common';
import { AdditionalServicesService } from './services/additional-services.service';
import { AdditionalServicesController } from './controllers/additional-services.controller';
import { AdditionalServicesEntity } from './entities/additional-services.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '../booking/entities/booking.entity';
import { ExperiencesEntity } from '../experiences/entities/experiences.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdditionalServicesEntity, BookingEntity, ExperiencesEntity]),
  ],
  providers: [AdditionalServicesService],
  controllers: [AdditionalServicesController]
})
export class AdditionalServicesModule {}
