import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminRole } from "../../common/enum/admin.role";

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    full_name: string;

    @Column({ type: 'enum', enum: AdminRole, default: AdminRole.ADMIN })
    role: AdminRole;

    @Column({ type: 'varchar', nullable: true })  
    refresh_token?: string;

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updated_at: Date;

}
