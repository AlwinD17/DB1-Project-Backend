import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email:string

    @IsNotEmpty()
    @IsString()
    readonly password:string

}