import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsBoolean, IsNotEmpty, IsOptional, IsDateString } from "class-validator";

export class CreateWatchHistoryDto {
    @ApiProperty({
        example: 1,
        description: "Tomosha qilayotgan foydalanuvchining profile IDsi",
    })
    @IsNotEmpty()
    @IsNumber()
    profile_id: number;

    @ApiProperty({
        example: 12,
        description: "Content (film yoki serial) IDsi",
    })
    @IsNotEmpty()
    @IsNumber()
    content_id: number;

    @ApiProperty({
        example: 3,
        description: "Agar content serial bo'lsa, shu epizodning IDsi",
    })
    @IsOptional()
    @IsNumber()
    episode_id?: number;

    @ApiProperty({
        example: 1250,
        description: "Tomosha to'xtatilgan vaqt (sekundlarda)",
    })
    @IsNotEmpty()
    @IsNumber()
    position_seconds: number;

    @ApiProperty({
        example: false,
        description: "Tomosha tugallangan yoki yo'qligini bildiradi",
    })
    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;

    @ApiProperty({
        example: "2025-11-01T12:34:56.000Z",
        description: "Oxirgi marta tomosha qilingan vaqt (ISO formatda)",
    })
    @IsNotEmpty()
    @IsDateString()
    last_watched_at: string;
}
