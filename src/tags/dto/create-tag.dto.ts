import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTagDto {
    @ApiProperty({
        example: "Action",
        description: "Kontentga tegishli teg (tag) nomi",
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;
}
