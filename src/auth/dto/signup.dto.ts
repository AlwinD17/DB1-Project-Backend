import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
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
    readonly lastName: string    
    
    @IsNotEmpty()
    @IsEnum({enum: ERoles})
    readonly rol: ERoles.ORGANIZER | ERoles.TRAVELER
}