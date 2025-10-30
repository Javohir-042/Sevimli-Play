import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";
import { DevicesEnum, DevicesOsEnum } from "../../common/enum/devices.role";

export class CreateDeviceDto {
    @ApiProperty({ example: 1, description: "Profil ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    profile_id: number;

    @ApiProperty({
        example: DevicesEnum.MOBILE,
        enum: DevicesEnum,
        description: "Qurilma turi (MOBILE, TABLET, DESKTOP)",
    })
    @IsEnum(DevicesEnum)
    @IsNotEmpty()
    device_type: DevicesEnum;

    @ApiProperty({ example: "iPhone 14 Pro", description: "Qurilma nomi" })
    @IsString()
    @IsNotEmpty()
    device_name: string;

    @ApiProperty({
        example: DevicesOsEnum.IOS,
        enum: DevicesOsEnum,
        description: "Operatsion tizim turi (IOS, ANDROID, WINDOWS, LINUX)",
    })
    @IsEnum(DevicesOsEnum)
    @IsNotEmpty()
    os: DevicesOsEnum;

    @ApiProperty({
        example: "2025-10-30T12:00:00Z",
        description: "Qurilma oxirgi ko'ringan vaqt (ISO formatda)",
    })
    @IsDateString()
    @IsNotEmpty()
    last_seen_at: string;
}
