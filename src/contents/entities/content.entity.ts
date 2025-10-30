import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { typeEnum } from "../../common/enum/contents.role";
import { ProfilesLanguageEnum } from "../../common/enum/profiles.role";
import { ContentTag } from "../../content-tags/entities/content-tag.entity";
import { ContentCategory } from "../../content-categories/entities/content-category.entity";
import { Rating } from "../../ratings/entities/rating.entity";

@Entity({ name: "contents" })
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: typeEnum,
        nullable: false,
    })
    type: typeEnum;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "timestamp", nullable: false })
    release_date: Date;

    @Column({
        type: "enum",
        enum: ProfilesLanguageEnum,
        nullable: false,
    })
    language: ProfilesLanguageEnum;

    @Column({ type: "varchar", length: 100 })
    country: string;

    @Column({ type: "int" })
    duration_minutes: number;

    @Column({ type: "varchar", length: 20 })
    maturity_level: string;

    @Column({ type: "boolean", default: false })
    is_published: boolean;

    @Column({ type: "varchar", length: 255, nullable: true })
    trailer_url: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;



    @OneToMany(() => ContentTag, (contentTag) => contentTag.tag)
    contentTags: ContentTag[];


    @OneToMany(() => ContentCategory, (contentCategory) => contentCategory.category)
    contentCategories: ContentCategory[];

    @OneToMany(() => Rating, (rating) => rating.content)
    ratings: Rating[];
}
