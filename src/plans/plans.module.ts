import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Subscription } from 'rxjs';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Subscription])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
