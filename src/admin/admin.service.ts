import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Not, Repository } from 'typeorm';
import bcrypt from 'bcrypt'
import { AdminRole } from '../common/enum/admin.role';

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

    if (createAdminDto.role === AdminRole.SUPERADMIN) {
      throw new BadRequestException("Superadmin faqat tizim tomonidan yaratiladi!");
    }

    const admin = this.adminRepo.create(createAdminDto)

    return this.adminRepo.save(admin)
  }

  async findAll() {
    return this.adminRepo.find({
      where: { role: Not(AdminRole.SUPERADMIN) },
      order: { created_at: 'ASC' },
    });
  }


  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin || admin.role === AdminRole.SUPERADMIN) {
      throw new NotFoundException("Bunday admin mavjud emas");
    }

    return admin;
  }


  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Bunday IDlik foydalanuvchi topilmadi");

    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      throw new BadRequestException("Emailni o'zgartirish mumkin emas!");
    }

    if (admin.role === AdminRole.SUPERADMIN) {
      throw new BadRequestException("Superadmin ma'lumotlarini o'zgartirish mumkin emas!");
    }

    Object.assign(admin, updateAdminDto);

    return await this.adminRepo.save(admin);
  }


  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException("Bunday IDlik admin topilmadi");
    }

    if (admin.role === AdminRole.SUPERADMIN) {
      throw new BadRequestException("Superadminni o'chirish mumkin emas!");
    }

    await this.adminRepo.remove(admin);

    return {message: `id o'chirildi`};
  }

  async findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, token: string | null) {
    await this.adminRepo.update(id, { refresh_token: token || undefined });  // ✅
  }


  async onModuleInit() {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = String(process.env.SUPER_ADMIN_NAME) || "Javohir";

    if (!email || !password) return;

    const existSuperAdmin = await this.adminRepo.findOne({ where: { email } });


    if (!existSuperAdmin) {
      const hashedPassword = await bcrypt.hash(password, 7);
      await this.adminRepo.save({
        email,
        password: hashedPassword,
        full_name: name,
        role: AdminRole.SUPERADMIN,
        is_active: true,
      });
      console.log("Superadmin yaratildi ")
    }

  }

}
