// src/profiles/dto/create-profile.dto.ts
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { ProfilesLanguageEnum } from "../../common/enum/profiles.role";

export class CreateProfileDto {
    @ApiProperty({ description: "Foydalanuvchi ID raqami", example: 1 })
    @IsNumber()
    user_id: number;

    @ApiProperty({ description: "Ko'rinadigan ism", example: "Javohir" })
    @IsString()
    @IsNotEmpty()
    display_name: string;

    @ApiPropertyOptional({ description: "Avatar URL", example: "https://example.com/avatar.png" })
    @IsUrl()
    @IsOptional()
    avatar_url?: string;

    @ApiProperty({ description: "Profilning tili", enum: ProfilesLanguageEnum, example: ProfilesLanguageEnum.UZ })
    @IsEnum(ProfilesLanguageEnum)
    language: ProfilesLanguageEnum;

    @ApiPropertyOptional({ description: "Maturity level", example: "PG-13" })
    @IsString()
    @IsOptional()
    maturity_level?: string;

    @ApiProperty({ description: "Default profilmi?", example: true })
    @IsBoolean()
    is_default: boolean;
}
