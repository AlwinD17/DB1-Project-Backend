import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDTO {

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    paternal_lastName?: string;

    @IsOptional()
    @IsString()
    maternal_lastName?: string;

}