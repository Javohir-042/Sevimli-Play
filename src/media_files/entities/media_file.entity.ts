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
import { PlansEnumVideo_quality } from '../../common/enum/plans.role';
import { ProfilesLanguageEnum } from '../../common/enum/profiles.role';

@Entity({ name: 'media_files' })
export class MediaFile {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Content, (content) => content.mediaFiles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @Column()
    content_id: number;


    @ManyToOne(() => Episode, (episode) => episode.mediaFiles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'episode_id' })
    episode: Episode;

    @Column({ nullable: true })
    episode_id: number;



    @Column({
        type: 'enum',
        enum: PlansEnumVideo_quality,
    })
    quality: PlansEnumVideo_quality;

    @Column({ type: 'varchar', length: 50 })
    resolution: string;

    @Column({ type: 'text' })
    url: string;

    @Column({ type: 'varchar', length: 100 })
    drm_type: string;

    @Column({
        type: 'enum',
        enum: ProfilesLanguageEnum,
    })
    available_langs: ProfilesLanguageEnum;

    @Column({ type: 'float' })
    size_mb: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
