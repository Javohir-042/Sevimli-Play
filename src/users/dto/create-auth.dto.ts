import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Foydalanuvchi email manzili' })
    email: string;

    @ApiProperty({ example: '12345678', description: 'Foydalanuvchi paroli' })
    password: string;

    @ApiProperty({ example: '+998901234567', description: 'Foydalanuvchi telefon raqami', required: false })
    phone?: string;
}


export class SignInDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Foydalanuvchi email manzili' })
    email: string;

    @ApiProperty({ example: '12345678', description: 'Foydalanuvchi paroli' })
    password: string;
}
