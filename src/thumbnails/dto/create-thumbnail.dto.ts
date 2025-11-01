import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEnum, IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { TypeThumbnailsEnum } from "../../common/enum/type.role";

export class CreateThumbnailDto {
    @ApiProperty({ example: 1, description: "Kontent ID (film yoki serial ID)" })
    @IsNumber()
    @IsNotEmpty()
    content_id: number;

    @ApiProperty({ example: 2, description: "Epizod ID (agar mavjud bo'lsa)" })
    @IsNumber()
    @IsOptional()
    episode_id?: number;

    @ApiProperty({
        example: TypeThumbnailsEnum.BANNER,
        enum: TypeThumbnailsEnum,
        description: "Thumbnail turi (masalan: POSTER, PREVIEW, BACKGROUND)",
    })
    @IsEnum(TypeThumbnailsEnum)
    @IsNotEmpty()
    type: TypeThumbnailsEnum;

    @ApiProperty({
        example: "https://example.com/thumbnails/poster1.jpg",
        description: "Thumbnail rasmi URL manzili",
    })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ example: 1920, description: "Rasm kengligi (px)" })
    @IsNumber()
    @IsNotEmpty()
    width: number;

    @ApiProperty({ example: 1080, description: "Rasm balandligi (px)" })
    @IsNumber()
    @IsNotEmpty()
    height: number;
}
