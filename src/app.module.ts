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
import { TagsModule } from './tags/tags.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

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
    AdditionalServicesModule, TagsModule],
  providers: [    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide:APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule {}
