import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { typeEnum } from "../../common/enum/contents.role";
import { ProfilesLanguageEnum } from "../../common/enum/profiles.role";
import { ContentTag } from "../../content-tags/entities/content-tag.entity";
import { ContentCategory } from "../../content-categories/entities/content-category.entity";
import { Rating } from "../../ratings/entities/rating.entity";
import { Episode, } from "../../episodes/entities/episode.entity";
import { MediaFile } from "../../media_files/entities/media_file.entity";
import { Thumbnail } from "../../thumbnails/entities/thumbnail.entity";
import { WatchHistory } from "../../watch_histories/entities/watch_history.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { ContentPeople } from "../../content_people/entities/content_people.entity";

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


    @OneToMany(() => Episode, (episode) => episode.content)
    episodes: Episode[];


    @OneToMany(() => MediaFile, (mediaFile) => mediaFile.content)
    mediaFiles: MediaFile[];


    @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.content)
    thumbnails: Thumbnail[];


    @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.content)
    watch_histories: WatchHistory[];

    @OneToMany(() => Comment, (comment) => comment.content)
    comments: Comment[];


    @OneToMany(() => ContentPeople, (contentPeople) => contentPeople.content)
    contentPeople: ContentPeople[];
}
