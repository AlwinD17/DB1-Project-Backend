import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { ExperiencesEntity } from '../experiences/entities/experiences.entity';
import { BookingEntity } from '../booking/entities/booking.entity';
import { LinksEntity } from '../links/entities/links.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersEntity, ExperiencesEntity, LinksEntity, BookingEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
