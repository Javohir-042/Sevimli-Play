import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Kategoriya nomi (masalan: Texnologiyalar, Sport, Musiqa)',
        example: 'Texnologiyalar',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Kategoriya haqida qisqacha tavsif',
        example: 'Texnologiyalar sohasidagi yangiliklar va maqolalar',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    description: string;
}
