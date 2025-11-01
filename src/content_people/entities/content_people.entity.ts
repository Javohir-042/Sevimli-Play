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
import { People } from '../../people/entities/people.entity';
import { Content_peopleEnum } from '../../common/enum/content_people.role';

@Entity({ name: 'content_people' })
export class ContentPeople {
    @PrimaryGeneratedColumn()
    id: number;



    @ManyToOne(() => Content, (content) => content.contentPeople, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @Column()
    content_id: number;

    @ManyToOne(() => People, (people) => people.contentPeople, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'person_id' })
    people: People;

    @Column()
    people_id: number;



    @Column({
        type: 'enum',
        enum: Content_peopleEnum,
    })
    role: Content_peopleEnum;

    @Column({ type: 'varchar', length: 255, nullable: true })
    character_name?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
}
