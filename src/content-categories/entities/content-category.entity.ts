import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Content } from 'src/contents/entities/content.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity('content_categories')
export class ContentCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content_id: number;

    @Column()
    category_id: number;

    @ManyToOne(() => Content, (content) => content.contentCategories, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', 
    })
    @JoinColumn({ name: 'content_id' })
    content: Content;

    @ManyToOne(() => Category, (category) => category.contentCategories, { 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
