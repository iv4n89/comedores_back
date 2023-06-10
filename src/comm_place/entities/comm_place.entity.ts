import { IsOptional } from "class-validator";
import { City } from "src/country/entities/city.entity";
import { Address } from "src/user/entities/address.entity";
import { User } from "src/user/entities/user.entity";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommunityEntity } from "./comm_entity.entity";
import { CommunityEntityPerson } from "./comm_entity_person.entity";
import { CommPlaceUserRegistry } from "./user_registry.entity";

export type CommPlaceType = 
    | 'community kitchen'
    | 'company store'
    ;

@Entity({ name: 'community_places' })
export class CommPlace {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'identifier', nullable: true })
    identifier: string;

    @Column('varchar', { name: 'name', nullable: true })
    name: string;

    @Column('varchar', { name: 'cif', nullable: false })
    cif: string;

    @Column('varchar', { name: 'type', nullable: false, default: 'community kitchen' })
    type: CommPlaceType;

    @ManyToOne(() => Address, address => address.commPlaces, { eager: true })
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @OneToMany(() => CommPlaceUserRegistry, userRegistry => userRegistry.commPlace)
    userRegistry: CommPlaceUserRegistry;

    @ManyToMany(() => User, user => user.commPlaces)
    users: User[];

    @ManyToMany(() => CommunityEntity, commEntity => commEntity.commPlaces, { eager: true, nullable: true })
    @JoinTable({ name: 'comm_places_entities' })
    entity: CommunityEntity[];

    @ManyToOne(() => CommunityEntityPerson, person => person.commPlaces, { eager: true })
    @JoinColumn({ name: 'responsible_person_id' })
    responsiblePerson: CommunityEntityPerson;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @IsOptional()
    city: City;

    @IsOptional()
    postalCodes: string[];

    @IsOptional()
    responsibleTlf: string;

    @AfterLoad()
    getCity() {
        if (this?.address && this?.address?.city) {
            this.city = this.address.city;
            this.postalCodes = this.address.city.postalCode.split(',');
        }
    }

    @AfterLoad()
    getResponsibleTlf() {
        if (this?.responsiblePerson) {
            this.responsibleTlf = this.responsiblePerson.telephone;
        }
    }

    @BeforeInsert()
    generateIdentifier() {
        const numId = this.type === 'community kitchen' ? '02' : '03';
        if (this?.name) {
            this.identifier = `${numId}-${ this.name }`;
        } else if (this?.address) {
            this.identifier = `${ numId }-${ this.address.streetName }`;
        } else {
            this.identifier = `${ numId }-${ this.cif }`;
        }
    }

    @BeforeUpdate() 
    regenerateIdentifier() {
        const identifier = this.identifier.split('-');
        if (this?.name) {
            identifier[1] = this.name;
            this.identifier = identifier.join('-');
        } else if (this?.address?.streetName) {
            identifier[1] = this.address.streetName;
            this.identifier = identifier.join('-');
        }
    }

}
