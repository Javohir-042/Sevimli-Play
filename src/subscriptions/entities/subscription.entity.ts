import { subscribe } from "diagnostics_channel";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubscriptionsEnum } from "../../common/enum/subscriptions.role";
import { User } from "../../users/entities/user.entity";
import { Plan } from "../../plans/entities/plan.entity";
import { Payment } from "../../payments/entities/payment.entity";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

// -----------------------------------------------------------------

    @ManyToOne(() => User, (user) => user.subscription, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'User_id' })
    user: User;


    @ManyToOne(() => Plan, (plan) => plan.subscription, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'plan_id'})
    plan: Plan;
// ----------------------------------------------------------------

    @Column({type: 'enum', enum: SubscriptionsEnum, default: SubscriptionsEnum.ACTIVE})
    status: SubscriptionsEnum;

    @Column({type: 'timestamp'})
    start_date: Date;

    @Column({type: 'timestamp'})
    end_date: Date;

    @Column({type: 'boolean', default: true})
    auto_renew: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @OneToMany(() => Payment, (payment) => payment.subscription)
    payment: Payment[];
}
