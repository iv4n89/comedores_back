import { Image } from "src/common/entities/image.entity";
import { CommPlace } from "src/comm_place/entities/comm_place.entity";
import { CommPlaceUserRegistry } from "src/comm_place/entities/user_registry.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";
import { IdentityDoc } from "./identityDoc.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @Column('varchar', { name: 'surname', nullable: false })
    surname: string;

    @Column('varchar', { name: 'tel_number', nullable: false })
    telNumber: string;

    @OneToOne(() => IdentityDoc, identityDoc => identityDoc.user, { nullable: true, eager: true })
    identityDoc: IdentityDoc;

    @OneToOne(() => Address, address => address.users, { nullable: true, eager: true })
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @OneToMany(() => CommPlaceUserRegistry, registry => registry.user)
    commKitchenRegistry: CommPlaceUserRegistry[];

    @ManyToMany(() => CommPlace, commPlace => commPlace.users, { nullable: true })
    @JoinTable({ name: 'comm_places_users' })
    commPlaces: CommPlace[];

    @OneToOne(() => Image, image => image.user, { nullable: true, eager: true })
    @JoinColumn({ name: 'image_id' })
    image: Image;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
