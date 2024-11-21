import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPassDTO{
    @IsNotEmpty()
    @IsEmail()
    readonly email :string
}

export class ChangePasswordDTO{
    @IsNotEmpty()
    @IsString()
    readonly token: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    readonly newPassword: string
}