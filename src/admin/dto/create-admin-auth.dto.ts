import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateAdminDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    full_name?: string;
}

export class SignInAdminDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}