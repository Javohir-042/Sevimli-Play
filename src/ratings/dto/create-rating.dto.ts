import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min, Max, MinLength } from "class-validator";

export class CreateRatingDto {
    @ApiProperty({
        description: "Reyting qo'shilayotgan kontentning ID raqami",
        example: 12,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    content_id: number;

    @ApiProperty({
        description: "Reyting qoldirayotgan foydalanuvchi (profil) ID raqami",
        example: 7,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    profile_id: number;

    @ApiProperty({
        description: "Kontent uchun berilgan reyting (1 dan 5 gacha)",
        example: 4,
        minimum: 1,
        maximum: 5,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        description: "Foydalanuvchi tomonidan yozilgan izoh (review)",
        example: "Juda zo'r video! Sifatli va foydali ma'lumotlar berilgan.",
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    review: string;
}
