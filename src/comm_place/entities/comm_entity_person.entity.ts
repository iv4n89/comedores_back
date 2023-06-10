import { IsOptional } from "class-validator";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommunityEntity } from "./comm_entity.entity";
import { CommPlace } from "./comm_place.entity";
import * as bcrypt from 'bcrypt';


@Entity({ name: 'community_entity_persons' })
export class CommunityEntityPerson {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @Column('varchar', { name: 'surname', nullable: false })
    surname: string;

    @Column('varchar', { name: 'telephone', nullable: false })
    telephone: string;

    @Column('varchar', { name: 'username', nullable: true, unique: true })
    username: string;

    @Column('varchar', { name: 'password', nullable: true })
    password: string;

    @OneToMany(() => CommPlace, commPlace => commPlace.responsiblePerson)
    commPlaces: CommPlace[];

    @OneToOne(() => CommunityEntity, entity => entity.person)
    @JoinColumn({ name: 'entity_id' })
    entity: CommunityEntity;

    @IsOptional()
    responsibeFor: CommPlace;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @AfterLoad()
    getResponsibleFor() {
        if (this?.commPlaces?.length) {
            this.responsibeFor = this.commPlaces?.at(0);
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(this.password, saltRounds);
            this.password = hashedPassword;
        }
    }
}