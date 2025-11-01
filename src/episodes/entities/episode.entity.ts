import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Content } from 'src/contents/entities/content.entity';
import { MediaFile } from '../../media_files/entities/media_file.entity';
import { Thumbnail } from '../../thumbnails/entities/thumbnail.entity';
import { WatchHistory } from '../../watch_histories/entities/watch_history.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity({ name: 'watch_episodes' })
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Content, (content) => content.episodes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    content: Content;

    @Column({ type: 'int' })
    content_id: number;

    @Column({ type: 'int' })
    seanson: number;

    @Column({ type: 'int' })
    expisode_number: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'float' })
    duration_minutes: number;

    @Column({ type: 'date' })
    release_date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;


    @OneToMany(() => MediaFile, (mediaFile) => mediaFile.episode)
    mediaFiles: MediaFile[];


    @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.episode)
    thumbnails: Thumbnail[];

    @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.episode)
    watch_histories: WatchHistory[];


    @OneToMany(() => Comment, (comment) => comment.episode )
    comments: Comment[];
}
