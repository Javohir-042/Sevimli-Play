import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Subscription } from "../../subscriptions/entities/subscription.entity";
import { paymentsEnum, statusEnum } from "../../common/enum/payments.role";

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    // ------------------------------------------------------

    @ManyToOne(() => User, (user) => user.payment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'User_id' })
    user: User;


    @ManyToOne(() => Subscription, (subscription) => subscription.payment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'subscription_id' })
    subscription: Subscription;

    // -----------------------------------------------------------

    @Column()
    provider: string;

    @Column({ unique: true })
    transaction_id: string;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: "enum",
        enum: paymentsEnum,
    })
    currency: paymentsEnum;

    @Column({
        type: "enum",
        enum: statusEnum,
        default: statusEnum.PENDING,
    })
    status: statusEnum;

    @Column({ type: "timestamp", nullable: true })
    paid_at: Date | null;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
