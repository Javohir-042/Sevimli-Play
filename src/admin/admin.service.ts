import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) { }

  async create(createAdminDto: CreateAdminDto) {

    const existsAdmin = await this.adminRepo.findOne({ where: { email: createAdminDto.email } });

    if (existsAdmin) {
      throw new BadRequestException('Bunday email mavjud');
    }

    const admin = this.adminRepo.create(createAdminDto)

    return this.adminRepo.save(admin)
  }

  findAll() {
    return this.adminRepo.find({ order: { created_at: 'ASC' } });
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id })
    if(!admin){
      throw new NotFoundException("Bunday id mavjud emas")
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.adminRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Bunday IDlik foydalanuvchi topilmadi");

    if (updateAdminDto.email && updateAdminDto.email !== user.email) {
      throw new BadRequestException("Emailni o'zgartirish mumkin emas!");
    }

    Object.assign(user, updateAdminDto);

    return await this.adminRepo.save(user);
  }


  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException("Bunday IDlik admin topilmadi");
    }

    await this.adminRepo.remove(admin);

    return {};
  }

}
