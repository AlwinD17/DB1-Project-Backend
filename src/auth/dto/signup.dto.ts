import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Validate } from "class-validator";
import { ERoles } from "../../config/roles.enum";

export class SignUpDTO{
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    readonly password: string

    @IsNotEmpty()
    @IsString()
    readonly firstName: string

    @IsNotEmpty()
    @IsString()
    readonly paternal_lastName: string    

    @IsNotEmpty()
    @IsString()
    readonly maternal_lastName: string    
    
    @IsNotEmpty()
    @IsEnum(ERoles, { message: 'Role must be either ORGANIZER or TRAVELER' })
    @Validate((value) => value === ERoles.ORGANIZER || value === ERoles.TRAVELER, {
      message: 'Role must be ORGANIZER or TRAVELER',
    })
    readonly role: ERoles;
}