import { Module } from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';
import { BookingEntity } from './entities/booking.entity';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { AdditionalServicesEntity } from '../additional-services/entities/additional-services.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookingEntity, PaymentEntity,UsersEntity, AdditionalServicesEntity]),
  ],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
