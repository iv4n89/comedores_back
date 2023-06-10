import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommunityEntityPerson } from "./comm_entity_person.entity";
import { CommPlace } from "./comm_place.entity";


@Entity({ name: 'community_entities' })
export class CommunityEntity {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'identifier', nullable: false })
    identifier: string;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @Column('varchar', { name: 'nif', nullable: false })
    nif: string;

    @Column('float', { name: 'applicable_rate', nullable: true, default: 0.50 })
    applicableRate: 0.50 | 0.75 | 2.50;

    @ManyToMany(() => CommPlace, commPlace => commPlace.entity)
    commPlaces: CommPlace[];

    @OneToOne(() => CommunityEntityPerson, person => person.entity, { eager: true })
    person: CommunityEntityPerson;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    generateIdentifier() {
        this.identifier = `01-${ this.name }`;
    }

    @BeforeUpdate()
    regenerateIdentifier() {
        if (this.name) {
            this.identifier = `01-${ this.name }`;
        }
    }

}