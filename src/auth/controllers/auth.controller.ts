import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { SignUpDTO } from '../dto/signup.dto';
import { PublicAccess } from '../decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';




@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService
    ){}


    @PublicAccess()
    @Post('login')
    @ApiOperation({ summary: 'User login', description: 'Authenticate a user with email and password.' })
    @ApiResponse({ status: 200, description: 'Login successful.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() body: LoginDTO) {
      return await this.authService.signIn(body.email, body.password);
    }


    @PublicAccess()
    @Post('register')
    @ApiOperation({ summary: 'User registration', description: 'Register a new user.' })
    @ApiBody({
      description: 'User registration details',
      schema: {
        example: {
          email: "newuser@example.com",
          password: "Password!123",
          firstName: "John",
          lastName: "Doe",
          role: "organizer", // or "TRAVELER"
        },
      },
    })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error or duplicate email.' })
    async register(@Body() body: SignUpDTO){
      const result = await this.authService.signUp(body)
      if(!result.success){
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
      }
      return result
    }

}
