import { Module } from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';
import { BookingEntity } from './entities/booking.entity';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { AdditionalServicesEntity } from '../additional-services/entities/additional-services.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ExperiencesEntity } from '../experiences/entities/experiences.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookingEntity, PaymentEntity, UsersEntity, AdditionalServicesEntity, ExperiencesEntity]),
  ],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
