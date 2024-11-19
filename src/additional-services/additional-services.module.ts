import { Module } from '@nestjs/common';
import { AdditionalServicesService } from './services/additional-services.service';
import { AdditionalServicesController } from './controllers/additional-services.controller';

@Module({
  providers: [AdditionalServicesService],
  controllers: [AdditionalServicesController]
})
export class AdditionalServicesModule {}
