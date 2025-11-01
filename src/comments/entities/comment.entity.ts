import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Content } from '../../contents/entities/content.entity';
import { Episode } from '../../episodes/entities/episode.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

// ------------------------------------------------------------

    @ManyToOne(() => Content, (content) => content.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @Column()
    content_id: number;

    @ManyToOne(() => Episode, (episode) => episode.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'episode_id' })
    episode?: Episode;

    @Column({ nullable: true })
    episode_id?: number;

    @ManyToOne(() => Profile, (profile) => profile.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @Column()
    profile_id: number;

// -----------------------------------------------------------


    @Column({ type: 'text' })
    body: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
}
