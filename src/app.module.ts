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
import { AdminSeederService } from './users/seeders/admin-seeder';
import { UsersEntity } from './users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    TypeOrmModule.forFeature([UsersEntity]),
    UsersModule, 
    AuthModule,
    ExperiencesModule, 
    BookingModule, 
    PaymentModule, 
    AdditionalServicesModule,
    TagsModule,
    LinksModule
  ],

  providers: [    
    AdminSeederService,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide:APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule {
  constructor(
    private AdminSeederService: AdminSeederService,
  ) {}

  async onModuleInit() {
    if (process.env.ENABLE_SEEDING === 'true') {
      await this.AdminSeederService.seed();
  }
}
}
