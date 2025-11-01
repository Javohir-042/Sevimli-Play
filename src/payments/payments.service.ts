import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { statusEnum } from '../common/enum/payments.role';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(User) private readonly userRepo: Repository<User>,

    @InjectRepository(Subscription) private readonly subscriptionRepo: Repository<Subscription>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const { user_id, subscription_id, transaction_id, status } = createPaymentDto;

    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const subscription = await this.subscriptionRepo.findOne({
      where: { id: subscription_id },
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription not found`);
    }

    const existingPayment = await this.paymentRepo.findOne({ where: { transaction_id } })
    if (existingPayment) {
      throw new BadRequestException('Transaction id already exists')
    };

    const payment = this.paymentRepo.create({
      ...createPaymentDto,
      user,
      subscription,
      paid_at: status === statusEnum.PENDING ? new Date() : null,
    })

    return await this.paymentRepo.save(payment);
  }

  findAll() {
    return this.paymentRepo.find({
      relations: ['user', 'subscription'],
      order: { id :'ASC'}
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['user', 'subscription']
    })

    if (!payment) {
      throw new NotFoundException('Payment id not found')
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.findOneBy({ id })
    if (!payment) {
      throw new NotFoundException('Payent id not found')
    }

    const { user_id, subscription_id, transaction_id } = updatePaymentDto

    if (user_id) {
      const user = await this.userRepo.findOne({ where: { id: user_id } })
      if(!user){
        throw new NotFoundException("User id not found")
      }

      payment.user = user;
    }

    if (subscription_id) {
      const subscription = await this.subscriptionRepo.findOne({ where: { id: subscription_id } })
      if (!subscription) {
        throw new NotFoundException("Subscription id not found")
      }

      payment.subscription = subscription;
    }

    if(transaction_id){
      const exists =await this.paymentRepo.findOne({ where: {transaction_id: updatePaymentDto.transaction_id}});
      if(exists && exists.id !== id){
        throw new BadRequestException('Transaction ID already exists')
      }
    }

    Object.assign(payment, updatePaymentDto)

    if (updatePaymentDto.status === statusEnum.PENDING && !payment.paid_at) {
      payment.paid_at = new Date();
    }

    return await this.paymentRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.paymentRepo.delete({ id });
    if (payment.affected === 0) {
      throw new NotFoundException('payment not found')
    }
    return {message: `id o'chirldi`}
  }
}
