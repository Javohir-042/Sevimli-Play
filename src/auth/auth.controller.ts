import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Roles } from "../common/decorator/roles.decorator";
import { SignInDto, SignUpDto } from "../users/dto/create-auth.dto";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signUp")
  @Roles("public")
  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiResponse({ status: 201, description: "Ro'yxatdan o'tish muvaffaqiyatli" })
  async register(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post("signIn")
  @Roles("public")
  @ApiOperation({ summary: "Foydalanuvchini tizimga kiritish" })
  @ApiResponse({ status: 200, description: "Tizimga kirish muvaffaqiyatli" })
  async login(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
