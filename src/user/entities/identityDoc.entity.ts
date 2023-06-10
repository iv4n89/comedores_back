import { IdentityDocType } from "src/util/identityDoc";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: 'identity_docs' })
export class IdentityDoc {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'id_number', nullable: false, unique: true })
    idNumber: string;

    @Column('varchar', { name: 'doc_type', nullable: false })
    docType: IdentityDocType;

    @OneToOne(() => User, user => user.identityDoc)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}