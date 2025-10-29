import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Plan } from '../plans/entities/plan.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription) private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Plan) private readonly planRepo: Repository<Plan>,
  ) { }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { user_id, plan_id, start_date, end_date, auto_renew } = createSubscriptionDto;

    const user = await this.userRepo.findOne({ where: { id: user_id } })
    if (!user) {
      throw new NotFoundException('User id not found')
    }

    const plan = await this.planRepo.findOne({ where: { id: plan_id } })
    if (!plan) {
      throw new NotFoundException('Plan id not found')
    }

    if (new Date(start_date) >= new Date(end_date)) {
      throw new BadRequestException('end_date must be greater than start_date')
    }

    const subscription = this.subscriptionRepo.create({ ...createSubscriptionDto, user, plan })

    return this.subscriptionRepo.save(subscription)
  }

  findAll() {
    return this.subscriptionRepo.find({ relations: ['user', 'plan'], order: { id: 'DESC' } })
  }

  async findOne(id: number) {
    const subscription = await this.subscriptionRepo.findOne({ where: { id }, relations: ['user', 'plan'] })
    if (!subscription) {
      throw new NotFoundException('Subscriptin with id ${id} not found')
    }
    return subscription;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionRepo.findOne({ where: { id } })
    if (!subscription) {
      throw new NotFoundException("Bunday id mavjud edmas")
    }

    const { user_id, plan_id, start_date, end_date } = updateSubscriptionDto

    if (user_id) {
      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) {
        throw new NotFoundException('User id not found')
      }

      subscription.user = user;
    }

    if (plan_id) {
      const plan = await this.planRepo.findOne({ where: { id: plan_id } });
      if (!plan) {
        throw new NotFoundException('plan id not found')
      }

      subscription.plan = plan;
    }

    if (start_date && end_date) {
      if (new Date(start_date) >= new Date(end_date)) {
        throw new BadRequestException('end_date must be greater than start_date')
      }
    }

    Object.assign(subscription, updateSubscriptionDto);

    await this.subscriptionRepo.save(subscription)

    return subscription;
  }

  async remove(id: number) {
    const subscription = await this.subscriptionRepo.delete({ id });
    if(subscription.affected === 0) {
      throw new NotFoundException('Subscription not found')
    }
    return {}
  }
}
