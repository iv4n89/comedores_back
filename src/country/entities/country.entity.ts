import { Address } from "src/user/entities/address.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { State } from "./state.entity";

@Entity({ name: 'countries' })
export class Country {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @OneToMany(() => State, state => state.country)
    states: State[];

    @OneToMany(() => Address, address => address.coutry)
    addresses: Address[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
