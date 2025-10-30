import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AdminRole } from "../../common/enum/admin.role";

export class CreateAdminDto {
    @ApiProperty({
        description: "Admin email manzili",
        example: "javohirquromboyev933@gmail.com",
    })
    @IsEmail({})
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Admin kuchli paroli",
        example: "Javohir123!",
    })
    @IsStrongPassword({})
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: "Admin to'liq ismi",
        example: "Javohir Quromboyev",
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiPropertyOptional({
        description: "Admin roli ",
        example: AdminRole.ADMIN,
        enum: AdminRole,
    })
    @IsOptional()
    @IsEnum(AdminRole)
    role?: AdminRole;

    @ApiPropertyOptional({
        description: "Admin faol yoki yo'qligi",
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
