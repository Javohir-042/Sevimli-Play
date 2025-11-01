import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
    @InjectRepository(Profile) private readonly profileRepo: Repository<Profile>
  ) { }


  async create(createDeviceDto: CreateDeviceDto) {
    const { profile_id } = createDeviceDto;

    const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
    if (!profile) {
      throw new NotFoundException("Profile not found")
    }

    const device = this.deviceRepo.create({ ...createDeviceDto, profile })

    return this.deviceRepo.save(device)
  }

  findAll() {
    return this.deviceRepo.find({ relations: ['profile'], order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const device = await this.deviceRepo.findOneBy({ id })
    if (!device) {
      throw new NotFoundException("Bunday id mavjud emas")
    }

    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceRepo.findOneBy({ id })
    if (!device) {
      throw new NotFoundException("Bunday id mavjud emas")
    }

    const { profile_id, ...rest } = updateDeviceDto;

    if (profile_id) {
      const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
      if(!profile){
        throw new NotFoundException("Profile id not found")
      }

      device.profile = profile;
    }

    Object.assign(device, rest)

    return this.deviceRepo.save(device);
  }

  async remove(id: number) {
    const device = await this.deviceRepo.delete({ id })
    if(device.affected === 0) {
      throw new NotFoundException("Device not found")
    }
    return { message: "id o'chirildi"}
  }
}
