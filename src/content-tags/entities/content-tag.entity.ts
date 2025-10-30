import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Content } from '../../contents/entities/content.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class ContentTag {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Content, (content) => content.contentTags, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => Tag, (tag) => tag.contentTags, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;
}
