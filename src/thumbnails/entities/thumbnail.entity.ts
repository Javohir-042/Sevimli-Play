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
import { TypeThumbnailsEnum } from '../../common/enum/type.role';

@Entity({ name: 'thumbnails' })
export class Thumbnail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Content, (content) => content.thumbnails, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @Column()
    content_id: number;

    @ManyToOne(() => Episode, (episode) => episode.thumbnails, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'episode_id' })
    episode?: Episode;

    @Column({ nullable: true })
    episode_id?: number;

    @Column({
        type: 'enum',
        enum: TypeThumbnailsEnum,
    })
    type: TypeThumbnailsEnum;

    @Column({ type: 'text' })
    url: string;

    @Column({ type: 'int' })
    width: number;

    @Column({ type: 'int' })
    height: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
}
