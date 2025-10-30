// src/profiles/entities/profile.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // User entity
import { ProfilesLanguageEnum } from '../../common/enum/profiles.role';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.profiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    display_name: string;

    @Column({ nullable: true })
    avatar_url?: string;

    @Column({ type: 'enum', enum: ProfilesLanguageEnum })
    language: ProfilesLanguageEnum;

    @Column({ nullable: true })
    maturity_level?: string;

    @Column({ default: false })
    is_default: boolean;
}
