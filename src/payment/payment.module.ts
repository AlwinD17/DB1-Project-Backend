import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { BookingEntity } from '../booking/entities/booking.entity';
import { PaymentEntity } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([ PaymentEntity, BookingEntity]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
