import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsDateString, IsBoolean, IsNumber } from "class-validator";
import { typeEnum } from "../../common/enum/contents.role";
import { ProfilesLanguageEnum } from "../../common/enum/profiles.role";

export class CreateContentDto {
    @ApiProperty({
        example: typeEnum.MOVIE,
        enum: typeEnum,
        description: "Kontent turi (MOVIE, SERIES, SHOW va h.k.)",
    })
    @IsEnum(typeEnum)
    type: typeEnum;

    @ApiProperty({ example: "Inception", description: "Kontent nomi" })
    @IsString()
    title: string;

    @ApiProperty({ example: "A scientist explores dreams within dreams.", description: "Kontent tavsifi" })
    @IsString()
    description: string; 

    @ApiProperty({
        example: "2025-12-01T00:00:00Z",
        description: "Chiqarilgan sana (ISO formatda)",
    })
    @IsDateString()
    release_date: Date;

    @ApiProperty({
        example: ProfilesLanguageEnum.EN,
        enum: ProfilesLanguageEnum,
        description: "Kontent tili (EN, UZ, RU va h.k.)",
    })
    @IsEnum(ProfilesLanguageEnum)
    language: ProfilesLanguageEnum;

    @ApiProperty({ example: "USA", description: "Ishlab chiqarilgan mamlakat" })
    @IsString()
    country: string;

    @ApiProperty({ example: 148, description: "Davomiyligi (daqiqalarda)" })
    @IsNumber()
    duration_minutes: number;

    @ApiProperty({ example: "PG-13", description: "Yosh cheklovi darajasi" })
    @IsString()
    maturity_level: string;

    @ApiProperty({ example: true, description: "Kontent e'lon qilinganmi" })
    @IsBoolean()
    is_published: boolean;

    @ApiProperty({
        example: "https://youtube.com/trailer/inception",
        description: "Trailer URL manzili",
    })
    @IsString()
    trailer_url: string;
}
