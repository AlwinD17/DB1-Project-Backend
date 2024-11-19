import { Module } from '@nestjs/common';
import { OrganizersService } from './services/organizers.service';
import { OrganizersController } from './controllers/organizers.controller';

@Module({
  providers: [OrganizersService],
  controllers: [OrganizersController]
})
export class OrganizersModule {}
