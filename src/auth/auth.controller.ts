import { Controller, Post, Body, UseGuards, Req, Res, HttpCode } from '@nestjs/common';
import type{ Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { CookieGetter } from '../common/decorator/cookie-getter.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminRole } from '../common/enum/admin.role';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) { }

  // ========== USER ROUTES ==========
  @Post('user/signup')
  @ApiOperation({ summary: 'User ro\'yxatdan o\'tish' })
  async userSignup(@Body() dto: CreateUserDto) {
    const user = await this.auth.userSignup(dto);

    const { password, ...result } = user;
    return result;
  }

  @Post('user/signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'User tizimga kirish' })
  async userSignin(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.auth.userSignin(dto);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  @Post('user/signout')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('USER')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'User tizimdan chiqish' })
  async userSignout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return this.auth.userSignout(req.user.sub);
  }

  @Post('user/refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'User token yangilash' })
  async userRefresh(@CookieGetter('refresh_token') token: string, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.auth.userRefresh(token);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return { access_token: tokens.access_token };
  }

  // ========== ADMIN ROUTES ==========
  @Post('admin/signup')
  @ApiOperation({ summary: 'Admin yaratish' })
  async adminSignup(@Body() dto: CreateAdminDto) {
    const admin = await this.auth.adminSignup(dto);
    const { password, ...result } = admin;
    return result;
  }

  @Post('admin/signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Admin tizimga kirish' })
  async adminSignin(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.auth.adminSignin(dto);

    res.cookie('admin_refresh', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  @Post('admin/signout')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Admin tizimdan chiqish' })
  async adminSignout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('admin_refresh');
    return this.auth.adminSignout(req.user.sub);
  }

  @Post('admin/refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Admin token yangilash' })
  async adminRefresh(@CookieGetter('admin_refresh') token: string, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.auth.adminRefresh(token);
    res.cookie('admin_refresh', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return { access_token: tokens.access_token };
  }
}