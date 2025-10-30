import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    phone?: string;
}

export class SignInUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}