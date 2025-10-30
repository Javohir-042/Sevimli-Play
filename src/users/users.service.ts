import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const emailExists = await this.userRepo.findOne({ where: { email: createUserDto.email } });
    if (emailExists) {
      throw new BadRequestException('Bunday email mavjud');
    }

    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Bunday ID li foydalanuvchi topilmadi');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new NotFoundException("Bunday IDlik foydalanuvchi topilmadi");
  
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        throw new BadRequestException("Emailni o'zgartirish mumkin emas!");
      }
  
      Object.assign(user, updateUserDto);
  
      return await this.userRepo.save(user);
    }
  

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("Bunday IDlik user topilmadi");
    }

    await this.userRepo.remove(user);

    return {};
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    return user;
  }


  async updateRefreshToken(id: number, token: string | null) {
    await this.userRepo.update(id, { refresh_token: token || undefined });  // ✅
  }
  
}
