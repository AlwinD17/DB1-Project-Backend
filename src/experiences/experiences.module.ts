import { Module } from '@nestjs/common';
import { ExperiencesService } from './services/experiences.service';
import { ExperiencesController } from './controllers/experiences.controller';

@Module({
  providers: [ExperiencesService],
  controllers: [ExperiencesController]
})
export class ExperiencesModule {}
