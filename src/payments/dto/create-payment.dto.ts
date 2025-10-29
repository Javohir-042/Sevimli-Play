import { ApiProperty } from "@nestjs/swagger";
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from "class-validator";
import { paymentsEnum, statusEnum } from "../../common/enum/payments.role";

export class CreatePaymentDto {
    @ApiProperty({
        description: "To'lov qilgan foydalanuvchi ID raqami",
        example: 12,
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        description: "Foydalanuvchi obunasi (subscription) ID raqami",
        example: 5,
    })
    @IsNumber()
    @IsNotEmpty()
    subscription_id: number;

    @ApiProperty({
        description: "To'lov provayderi nomi (masalan: Payme, Click, Stripe va hokazo)",
        example: "Click",
    })
    @IsString()
    @IsNotEmpty()
    provider: string;

    @ApiProperty({
        description: "To'lov tizimi tomonidan berilgan tranzaksiya ID raqami",
        example: "TXN-2025-001245",
    })
    @IsString()
    @IsNotEmpty()
    transaction_id: string;

    @ApiProperty({
        description: "To'lov summasi (musbat son bo'lishi kerak)",
        example: 15000,
    })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({
        description: "To'lov valyutasi (UZS, USD va hokazo)",
        example: paymentsEnum.UZS,
        enum: paymentsEnum,
    })
    @IsEnum(paymentsEnum)
    @IsNotEmpty()
    currency: paymentsEnum;

    @ApiProperty({
        description: "To'lov holati (PENDING, SUCCESS, FAILED)",
        example: statusEnum.PENDING,
        enum: statusEnum,
    })
    @IsEnum(statusEnum)
    @IsNotEmpty()
    status: statusEnum;

    @ApiProperty({
        description: "To'lov amalga oshirilgan sana va vaqt (ISO formatda)",
        example: "2025-10-29T10:45:00Z",
    })
    @IsString()
    @IsOptional()
    paid_at: string;
}
