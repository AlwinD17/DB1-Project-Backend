import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { SignUpDTO } from '../dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

    async signIn(email: string, pass:string):Promise<{access_token: string}>{
      try {
        const {validated, user, error} = await this.usersService.validateUser(email, pass)
        
        if (!validated) {
          throw new UnauthorizedException(error || 'Validation failed');
        }
        
        const payload = {
          id: user.id, 
          role:user.role
        }
        return {
          access_token: await this.jwtService.signAsync(payload)
        }
      } catch (error) {
        throw new UnauthorizedException(error.message || 'Sign-in failed');
      }
    }

    async signUp(body:SignUpDTO):Promise<{ success: boolean, data?: any, message?: string }>{
        return this.usersService.createUser(body)
    }
}
