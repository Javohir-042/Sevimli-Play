import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { ContentPeople } from '../../content_people/entities/content_people.entity';

@Entity({ name: 'people' })
export class People {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    full_name: string;

    @Column({ type: 'text' })
    bio: string;

    @Column({ type: 'varchar', length: 500 })
    photo_url: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    birth_date: Date;


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => ContentPeople, (contentPeople) => contentPeople.people)
    contentPeople: ContentPeople[];
}
