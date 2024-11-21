import { Global, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/Users.entity';

@Global()
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'SECRETITO_SECRETITO',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
