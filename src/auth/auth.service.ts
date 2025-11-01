import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AdminService } from '../admin/admin.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private adminService: AdminService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    // ========== USER AUTH ==========
    async userSignup(dto: CreateUserDto) {
        const exists = await this.usersService.findUserByEmail(dto.email);
        if (exists) throw new ConflictException('Email allaqachon mavjud');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({ ...dto, password: hashed });

        return user
    }

    async userSignin(dto: SignInDto) {
        const user = await this.usersService.findUserByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Email yoki parol xato');

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Email yoki parol xato');

        return this.generateTokens(user.id, user.email, user.role, 'user');
    }

    async userSignout(userId: number) {
        await this.usersService.updateRefreshToken(userId, null);
        return { message: 'Muvaffaqiyatli chiqildi' };
    }

    async userRefresh(token: string) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.config.get('REFRESH_TOKEN_KEY'),
            });

            const user = await this.usersService.findOne(payload.sub);
            if (user.refresh_token !== token) {
                throw new UnauthorizedException('Refresh token noto\'g\'ri');
            }

            return this.generateTokens(user.id, user.email, user.role, 'user');
        } catch {
            throw new UnauthorizedException('Refresh token yaroqsiz');
        }
    }

    // ========== ADMIN AUTH ==========
    async adminSignup(dto: CreateAdminDto) {
        const exists = await this.adminService.findByEmail(dto.email);
        if (exists) throw new ConflictException('Email allaqachon mavjud');

        const hashed = await bcrypt.hash(dto.password, 10);
        const admin = await this.adminService.create({ ...dto, password: hashed });

        // return this.generateTokens(admin.id, admin.email, admin.role, 'admin');
        return admin
    }

    async adminSignin(dto: SignInDto) {
        const admin = await this.adminService.findByEmail(dto.email);
        if (!admin) throw new UnauthorizedException('Email yoki parol xato');

        const valid = await bcrypt.compare(dto.password, admin.password);
        if (!valid) throw new UnauthorizedException('Email yoki parol xato');

        if (admin.role === 'SUPERADMIN') {
            console.log(`✅ SuperAdmin tizimga kirdi: ${admin.email}`);
        }

        return this.generateTokens(admin.id, admin.email, admin.role, 'admin');
    }


    async adminSignout(adminId: number) {
        await this.adminService.updateRefreshToken(adminId, null);
        return { message: 'Muvaffaqiyatli chiqildi' };
    }

    async adminRefresh(token: string) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.config.get('REFRESH_TOKEN_KEY'),
            });

            const admin = await this.adminService.findOne(payload.sub);
            if (admin.refresh_token !== token) {
                throw new UnauthorizedException('Refresh token noto\'g\'ri');
            }

            return this.generateTokens(admin.id, admin.email, admin.role, 'admin');
        } catch {
            throw new UnauthorizedException('Refresh token yaroqsiz');
        }
    }

    // ========== HELPER ==========
    private async generateTokens(id: number, email: string, role: string, type: 'user' | 'admin') {
        const payload = { sub: id, email, role, type };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.config.get('ACCESS_TOKEN_KEY'),
            expiresIn: this.config.get('ACCESS_TOKEN_TIME'),
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get('REFRESH_TOKEN_KEY'),
            expiresIn: this.config.get('REFRESH_TOKEN_TIME'),
        });

        if (type === 'user') {
            await this.usersService.updateRefreshToken(id, refreshToken);
        } else {
            await this.adminService.updateRefreshToken(id, refreshToken);
        }

        return { access_token: accessToken, refresh_token: refreshToken };
    }
}
