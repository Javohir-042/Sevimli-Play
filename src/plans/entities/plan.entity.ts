import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { PlansEnumVideo_quality } from "../../common/enum/plans.role";
import { Subscription } from "../../subscriptions/entities/subscription.entity";

@Entity({ name: "plans" })
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    title: string;

    @Column({ type: "decimal"})
    price: number;

    @Column({ type: "varchar"})
    currency: string;

    @Column({ type: "varchar" })
    billing_period: string;

    @Column({
        type: "enum",
        enum: PlansEnumVideo_quality,
    })
    video_quality: PlansEnumVideo_quality;

    @Column({ type: "int", default: 1 })
    max_profiles: number;

    @Column({ type: "int", default: 1 })
    concurrent_streams: number;

    @Column({ type: "boolean", default: true })
    is_active?: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @OneToMany(() => Subscription, (subscription) => subscription.plan)
    subscription: Subscription[];
}
