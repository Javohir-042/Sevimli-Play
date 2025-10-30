import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ContentTag } from "../../content-tags/entities/content-tag.entity";

@Entity('tags')
export class Tag {
    @ApiProperty({
        example: 1,
        description: "Tagning unikal ID raqami",
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: "Action",
        description: "Kontentga tegishli tag (belgi) nomi",
    })
    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @ApiProperty({
        example: "2025-10-30T12:00:00Z",
        description: "Tag yaratilgan vaqt",
    })
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ApiProperty({
        example: "2025-10-30T12:30:00Z",
        description: "Tag oxirgi yangilangan vaqt",
    })
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;


    @OneToMany(() => ContentTag, (contentTag) => contentTag.tag)
    contentTags: ContentTag[];
}
