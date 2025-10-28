import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;

        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException("Bu email bilan foydalanuvchi mavjud!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepo.create({
            ...createUserDto,
            password: hashedPassword,
        });

        await this.userRepo.save(newUser);

        return {
            message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
            user: newUser
        };
    }

    async signIn({ email, password }: { email: string; password: string }) {
        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) throw new UnauthorizedException("Bunday foydalanuvchi topilmadi!");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException("Parol noto'g'ri!");

        const token = await this.generateToken(user);

        return {
            token,
        };
    }

    async generateToken(user: User) {
        const payload = { id: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

  
}
