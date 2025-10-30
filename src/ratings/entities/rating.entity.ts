import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Content } from 'src/contents/entities/content.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content_id: number;

    @Column()
    profile_id: number;

    @Column({ type: 'int' })
    rating: number;

    @Column({ type: 'text' })
    review: string;

    @ManyToOne(() => Content, (content) => content.ratings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => Profile, (profile) => profile.ratings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
