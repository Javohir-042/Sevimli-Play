import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: "Foydalanuvchi email manzili",
        example: "botir123@gmail.com",
    })
    @IsEmail({})
    email: string;

    @ApiProperty({
        description: "Foydalanuvchi paroli",
        example: "botir123!!",
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: "Foydalanuvchi telefon raqami",
        example: "+998901234567",
    })
    @IsPhoneNumber("UZ")
    phone?: string;

    @ApiPropertyOptional({
        description: "Email tekshirilgan yoki yo'qligi",
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    is_email_verified?: boolean;
}
