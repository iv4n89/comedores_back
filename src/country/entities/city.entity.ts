import { Address } from "src/user/entities/address.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Province } from "./province.entity";


@Entity({ name: 'cities' })
export class City {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @ManyToOne(() => Province, province => province.cities, { eager: true })
    @JoinColumn({ name: 'province_id' })
    province: Province;

    @OneToMany(() => Address, address => address.city)
    address: Address;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}