
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // User entity
import { ProfilesLanguageEnum } from '../../common/enum/profiles.role';
import { Device } from '../../devices/entities/device.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { WatchHistory } from '../../watch_histories/entities/watch_history.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.profiles, { 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
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

    @OneToMany(() => Device, (device) => device.profile)
    devices: Device[];

    @OneToMany(() => Rating, (rating) => rating.profile)
    ratings: Rating[];


    @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.profile)
    watch_histories: WatchHistory[];

    @OneToMany(() => Comment, (comment) => comment.profile)
    comments: Comment[];
}
