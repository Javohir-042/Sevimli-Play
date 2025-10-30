import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateContentCategoryDto {
    @ApiProperty({
        description: "Ushbu kategoriya tegishli bo'lgan kontentning ID raqami",
        example: 1,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    content_id: number;

    @ApiProperty({
        description: "Kontentga biriktirilayotgan kategoriya ID raqami",
        example: 3,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    category_id: number;
}
