import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private readonly planRepo: Repository<Plan>
  ) { }

  create(createPlanDto: CreatePlanDto) {

    return this.planRepo.save(createPlanDto)
  }

  findAll() {
    return this.planRepo.find({order: { id: 'ASC'}})
  }

  async findOne(id: number) {
    const plan = await this.planRepo.findOneBy({ id })
    if (!plan) {
      throw new NotFoundException("Bunday id topilmadi")
    }

    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    const plan = await this.planRepo.findOneBy({ id })
    if (!plan) {
      throw new NotFoundException("Bunday id topilmadi")
    }

    Object.assign(plan, updatePlanDto)
    return this.planRepo.save(plan)
  }

  async remove(id: number) {
    const plan = await this.planRepo.findOneBy({ id })
    if(!plan){
      throw new NotFoundException("Bunday id topilmadi")
    }

    await this.planRepo.remove(plan)

    return {message: `id o'chirildi`}
  }
}
