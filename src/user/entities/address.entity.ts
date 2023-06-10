import { CommPlace } from "src/comm_place/entities/comm_place.entity";
import { City } from "src/country/entities/city.entity";
import { Country } from "src/country/entities/country.entity";
import { Province } from "src/country/entities/province.entity";
import { State } from "src/country/entities/state.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: 'addresses' })
export class Address {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'addr_type', nullable: false })
    addrType: string;

    @Column('varchar', { name: 'street_name', nullable: false })
    streetName: string;

    @Column('int', { name: 'street_number', nullable: false })
    streetNumber: number;

    @Column('int', { name: 'floor', nullable: true })
    floor: number;

    @Column('varchar', { name: 'door', nullable: true })
    door: string;

    @Column('varchar', { name: 'extra_info', nullable: true })
    extraInfo: string;
    
    @ManyToOne(() => Country, country => country.addresses, { eager: true })
    @JoinColumn({ name: 'country_id' })
    coutry: Country;

    @ManyToOne(() => State, state => state.addresses, { eager: true })
    @JoinColumn({ name: 'state_id' })
    state: State;

    @ManyToOne(() => Province, province => province.addresses)
    @JoinColumn({ name: 'province_id' })
    province: Province;

    @ManyToOne(() => City, city => city.address, { eager: true })
    @JoinColumn({ name: 'city_id' })
    city: City;

    @OneToOne(() => User, user => user.address)
    users: User;

    @OneToMany(() => CommPlace, commPlace => commPlace.address)
    commPlaces: CommPlace[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}