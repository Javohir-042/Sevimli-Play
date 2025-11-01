import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: 1, description: "Kontent ID (film yoki serial ID)" })
    @IsNumber()
    @IsNotEmpty()
    content_id: number;

    @ApiProperty({ example: 3, description: "Epizod ID (agar bu serial bo'lsa, optional)" })
    @IsNumber()
    @IsOptional()
    episode_id?: number;

    @ApiProperty({ example: 5, description: "Foydalanuvchi (profil) ID" })
    @IsNumber()
    @IsNotEmpty()
    profile_id: number;

    @ApiProperty({ example: "Bu film juda zo'r chiqibdi!", description: "Izoh matni" })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    body: string;
}
