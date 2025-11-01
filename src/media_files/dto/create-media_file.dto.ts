import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsNumber,
    IsString,
    IsUrl,
    IsNotEmpty,
    Min,
} from "class-validator";
import { PlansEnumVideo_quality } from "../../common/enum/plans.role";
import { ProfilesLanguageEnum } from "../../common/enum/profiles.role";

export class CreateMediaFileDto {
    @ApiProperty({
        example: 1,
        description: "Kontent (film yoki serial) ID raqami",
    })
    @IsNumber()
    @IsNotEmpty()
    content_id: number;

    @ApiProperty({
        example: 3,
        description: "Epizod ID raqami (agar bu serialga tegishli bo'lsa)",
    })
    @IsNumber()
    @IsNotEmpty()
    episode_id: number;

    @ApiProperty({
        example: PlansEnumVideo_quality.HD,
        enum: PlansEnumVideo_quality,
        description: "Video sifati (masalan: SD, HD, FHD)",
    })
    @IsEnum(PlansEnumVideo_quality)
    @IsNotEmpty()
    quality: PlansEnumVideo_quality;

    @ApiProperty({
        example: "1920x1080",
        description: "Video rezolyutsiyasi",
    })
    @IsString()
    @IsNotEmpty()
    resolution: string;

    @ApiProperty({
        example: "https://cdn.example.com/movies/breaking-bad-s1e1.mp4",
        description: "Media faylning to'liq URL manzili",
    })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        example: "Widevine",
        description: "DRM (Digital Rights Management) turi",
    })
    @IsString()
    @IsNotEmpty()
    drm_type: string;

    @ApiProperty({
        example: ProfilesLanguageEnum.UZ,
        enum: ProfilesLanguageEnum,
        description: "Mavjud tillar (masalan: UZ, EN, RU)",
    })
    @IsEnum(ProfilesLanguageEnum)
    @IsNotEmpty()
    available_langs: ProfilesLanguageEnum;

    @ApiProperty({
        example: 850.75,
        description: "Media fayl hajmi (MB hisobida)",
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    size_mb: number;
}
