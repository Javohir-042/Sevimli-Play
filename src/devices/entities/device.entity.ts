import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DevicesEnum, DevicesOsEnum } from '../../common/enum/devices.role';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Profile, (profile) => profile.devices, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    profile: Profile;

    @Column()
    profile_id: number;



    @Column({
        type: 'enum',
        enum: DevicesEnum,
        nullable: false,
    })
    device_type: DevicesEnum;

    @Column({ type: 'varchar', length: 255 })
    device_name: string;

    @Column({
        type: 'enum',
        enum: DevicesOsEnum,
        nullable: false,
    })
    os: DevicesOsEnum;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_seen_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
