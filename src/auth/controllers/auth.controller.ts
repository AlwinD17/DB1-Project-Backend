import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { SignUpDTO } from '../dto/signup.dto';
import { PublicAccess } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';




@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService
    ){}

    @PublicAccess()
    @Post('login')
    async login(@Body() body: LoginDTO) {
      return await this.authService.signIn(body.email, body.password);
    }

    // @PublicAccess()
    // @Post('register')
    // async register(@Body() body: SignUpDTO){
    //   const result = await this.authService.signUp(body)
    //   if(!result.success){
    //     throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
    //   }
    //   return result
    // }



}
