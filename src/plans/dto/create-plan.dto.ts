import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsString,
    IsNumber,
    IsEnum,
    IsOptional,
    IsNotEmpty,
    Min,
    IsBoolean
} from "class-validator";
import { PlansEnumVideo_quality } from "../../common/enum/plans.role";

export class CreatePlanDto {
    @ApiProperty({
        description: "Obuna rejasining nomi (masalan: Premium, Standard, Basic)",
        example: "Premium Plan",
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: "Obuna uchun to'lov miqdori (oylik yoki yillik reja uchun)",
        example: 15.99,
    })
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: "Valyuta turi (masalan: USD, UZS, EUR)",
        example: "USD",
    })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({
        description: "Hisob-kitob davri (masalan: monthly yoki yearly)",
        example: "monthly",
    })
    @IsString()
    @IsNotEmpty()
    billing_period: string;

    @ApiProperty({
        description: "Video sifat darajasi (masalan: SD, HD, FULL_HD, ULTRA_HD)",
        example: PlansEnumVideo_quality.HD,
        enum: PlansEnumVideo_quality,
    })
    @IsEnum(PlansEnumVideo_quality)
    @IsNotEmpty()
    video_quality: PlansEnumVideo_quality;

    @ApiProperty({
        description: "Bitta obuna orqali yaratiladigan maksimal profil soni",
        example: 5,
    })
    @IsNumber()
    @Min(1,)
    @IsNotEmpty()
    max_profiles: number;

    @ApiProperty({
        description: "Bir vaqtning o'zida tomosha qilinadigan oqimlar (stream) soni",
        example: 2,
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    concurrent_streams: number;

    @ApiPropertyOptional({
        description: "Plan hozirda faolmi yoki yo'qmi",
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
