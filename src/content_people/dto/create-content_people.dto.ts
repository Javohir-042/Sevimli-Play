import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsEnum, IsString, MinLength, IsOptional } from "class-validator";
import { Content_peopleEnum } from "../../common/enum/content_people.role";

export class CreateContentPeopleDto {
    @ApiProperty({ example: 1, description: "Kontent ID (film yoki serial ID)" })
    @IsNumber()
    @IsNotEmpty()
    content_id: number;

    @ApiProperty({ example: 5, description: "Shaxs (people) ID" })
    @IsNumber()
    @IsNotEmpty()
    people_id: number;

    @ApiProperty({ example: Content_peopleEnum.DIRECTOR, enum: Content_peopleEnum, description: "Shaxs roli (DIRECTOR, ACTOR, WRITER, va hokazo)" })
    @IsEnum(Content_peopleEnum)
    @IsNotEmpty()
    role: Content_peopleEnum;

    @ApiProperty({ example: "Jack Dawson", description: "Agar aktyor bo'lsa, people ijro qilgan peopleaj nomi", required: false })
    @IsString()
    @IsOptional()
    @MinLength(1, { message: "Character name kamida 1 ta belgi bo'lishi kerak" })
    character_name?: string;
}
