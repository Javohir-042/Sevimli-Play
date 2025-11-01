import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsDateString, Min } from "class-validator";

export class CreateEpisodeDto {
    @ApiProperty({
        example: 1,
        description: "Kontentning ID raqami",
    })
    @IsNumber()
    content_id: number;

    @ApiProperty({
        example: 2,
        description: "Serialning nechinchi sezoniga tegishli ekanligini bildiradi",
    })
    @IsNumber()
    @Min(1)
    seanson: number;

    @ApiProperty({
        example: 5,
        description: "Epizod raqami — masalan, 5-epizod",
    })
    @IsNumber()
    @Min(1)
    expisode_number: number;

    @ApiProperty({
        example: "Yangi qahramon paydo bo'ldi",
        description: "Epizodning sarlavhasi",
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: "Bu epizodda bosh qahramon yangi vazifaga kirishadi...",
        description: "Epizod haqida qisqacha tavsif",
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        example: 45.5,
        description: "Epizod davomiyligi",
    })
    @IsNumber()
    @Min(1)
    duration_minutes: number;

    @ApiProperty({
        example: "2025-01-15",
        description: "Epizod chiqarilgan sana ",
    })
    @IsDateString()
    release_date: Date;
}
