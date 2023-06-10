import { Address } from "src/user/entities/address.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { City } from "./city.entity";
import { Country } from "./country.entity";
import { Province } from "./province.entity";


@Entity({ name: 'states' })
export class State {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @ManyToOne(() => Country, country => country.states, { eager: true })
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @OneToMany(() => Address, address => address.state)
    addresses: Address[];

    @OneToMany(() => Province, province => province.state)
    provinces: Province[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}