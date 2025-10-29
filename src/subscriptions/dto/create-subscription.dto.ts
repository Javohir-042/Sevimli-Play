import { ApiProperty } from "@nestjs/swagger";
import {
    IsNumber,
    IsEnum,
    IsBoolean,
    IsDateString,
    IsNotEmpty
} from "class-validator";
import { SubscriptionsEnum } from "../../common/enum/subscriptions.role";

export class CreateSubscriptionDto {
    @ApiProperty({
        description: "Foydalanuvchining unikal identifikatori (user_id)",
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        description: "Obuna rejasining identifikatori (plan_id)",
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    plan_id: number;

    @ApiProperty({
        description: "Obunaning joriy holati (active, expired, cancelled va h.k.)",
        example: SubscriptionsEnum.ACTIVE,
        enum: SubscriptionsEnum,
    })
    @IsEnum(SubscriptionsEnum)
    @IsNotEmpty()
    status: SubscriptionsEnum;

    @ApiProperty({
        description: "Obuna boshlangan sana (ISO formatda)",
        example: "2025-10-29T00:00:00.000Z",
    })
    @IsDateString()
    @IsNotEmpty()
    start_date: string;

    @ApiProperty({
        description: "Obuna tugash sanasi (ISO formatda)",
        example: "2025-11-29T00:00:00.000Z",
    })
    @IsDateString()
    @IsNotEmpty()
    end_date: string;

    @ApiProperty({
        description: "Obuna avtomatik yangilanadimi (true/false)",
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    auto_renew: boolean;
}
