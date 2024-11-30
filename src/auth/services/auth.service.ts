import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { SignUpDTO } from '../dto/signup.dto';
import { UsersModule } from '../../users/users.module';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

    async signIn(email: string, pass:string):Promise<{ success: boolean, token?:string, data?: any }>{
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
          success:true,
          token: await this.jwtService.signAsync(payload),
          data: user,
        }
      } catch (error) { 
        throw new UnauthorizedException(error.message || 'Sign-in failed');
      }
    }

    async signUp(body:SignUpDTO):Promise<{ success: boolean, token?:string, data?: any, message?: string }>{
       const result = await this.usersService.createUser(body)
       if(result.success){
        const payload = {
          id: result.data.id, 
          role: result.data.role
        }
        const access_token = await this.jwtService.signAsync(payload)
        return({
          success: true,
          token: access_token,
          data: result.data,
          message: result.message
      })
      }
      return result
    }
}
