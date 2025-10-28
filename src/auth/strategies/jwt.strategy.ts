import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_KEY || "defaultSecret",
        });
    }

    async validate(payload: any) {
        const user = await this.userRepo.findOne({ where: { id: payload.id } });
        if (!user) {
            throw new UnauthorizedException("Foydalanuvchi topilmadi yoki token noto'g'ri!");
        }
        return user; 
    }
}
