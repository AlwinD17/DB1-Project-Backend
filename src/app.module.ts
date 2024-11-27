import { Module } from '@nestjs/common';
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
import { LinksModule } from './links/links.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule, 
    AuthModule,
    ExperiencesModule, 
    BookingModule, 
    PaymentModule, 
    AdditionalServicesModule,
    TagsModule,
    LinksModule
  ],

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
