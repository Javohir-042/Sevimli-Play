
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ default: false })
    is_email_verified: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ default: 'USER' })
    role: string;


    @OneToMany(() => Subscription, (subscription) => subscription.user)
    subscription: Subscription[];


    @OneToMany(() => Payment, (payments) => payments.user)
    payment: Payment[];
}
