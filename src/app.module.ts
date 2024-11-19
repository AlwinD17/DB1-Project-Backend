import { Module } from '@nestjs/common';
import { OrganizersModule } from './organizers/organizers.module';
import { UsersModule } from './users/users.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
import { AdditionalServicesModule } from './additional-services/additional-services.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    OrganizersModule,
    UsersModule, 
    ExperiencesModule, 
    BookingModule, 
    PaymentModule, 
    AdditionalServicesModule],
  providers: [],
})
export class AppModule {}
