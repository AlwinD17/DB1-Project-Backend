import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { ExperiencesEntity } from '../experiences/entities/experiences.entity';
import { BookingEntity } from '../booking/entities/booking.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersEntity, ExperiencesEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
