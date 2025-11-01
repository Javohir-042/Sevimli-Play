import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Content } from 'src/contents/entities/content.entity';
import { Episode } from 'src/episodes/entities/episode.entity';

@Entity({ name: 'watch_histories' })
export class WatchHistory {
    @PrimaryGeneratedColumn()
    id: number;



    @ManyToOne(() => Profile, (profile) => profile.watch_histories, { 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', 
    })
    profile: Profile;

    @Column({ type: 'int' })
    profile_id: number;

    @ManyToOne(() => Content, (content) => content.watch_histories, { 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', 
    })
    content: Content;

    @Column({ type: 'int' })
    content_id: number;

    @ManyToOne(() => Episode, (episode) => episode.watch_histories, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    episode?: Episode;

    @Column({ type: 'int', nullable: true })
    episode_id?: number;

    

    @Column({ type: 'int' })
    position_seconds: number;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'timestamp' })
    last_watched_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
