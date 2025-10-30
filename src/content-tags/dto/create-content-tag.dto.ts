import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateContentTagDto {
    @ApiProperty({
        example: 1,
        description: 'Kontentning ID raqami',
    })
    @IsInt()
    @IsPositive()
    content_id: number;

    @ApiProperty({
        example: 3,
        description: 'Tegning ID raqami',
    })
    @IsInt()
    @IsPositive()
    tag_id: number;
}
