import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUrl, IsDate, MinLength } from "class-validator";

export class CreatePeopleDto {
    @ApiProperty({ example: "Leonardo DiCaprio", description: "To'liq ism va familiya" })
    @IsString()
    @MinLength(2, { message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak" })
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({ example: "Famous American actor and producer.", description: "Shaxs haqida qisqacha ma'lumot" })
    @IsString()
    @MinLength(5, { message: "Bio kamida 5 ta belgidan iborat bo'lishi kerak" })
    @IsNotEmpty()
    bio: string;

    @ApiProperty({ example: "https://example.com/photos/leonardo.jpg", description: "Shaxs rasmi URL manzili" })
    @IsUrl()
    @IsNotEmpty()
    photo_url: string;

    @ApiProperty({ example: "1974-11-11", description: "Tug'ilgan sana" })
    @IsString()
    @IsNotEmpty()
    birth_date?: Date;
}
