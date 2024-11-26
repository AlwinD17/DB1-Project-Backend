import { Module } from '@nestjs/common';
import { LinksService } from './services/links.service';
import { LinksController } from './controllers/links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksEntity } from './entities/links.entity';
import { UsersEntity } from '../users/entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LinksEntity, UsersEntity])],
  providers: [LinksService],
  controllers: [LinksController]
})
export class LinksModule {}
