import { Address } from "src/user/entities/address.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { City } from "./city.entity";
import { State } from "./state.entity";

@Entity({ name: 'provinces' })
export class Province {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @ManyToOne(() => State, state => state.provinces, { eager: true })
    @JoinColumn({ name: 'state_id' })
    state: State;

    @OneToMany(() => City, city => city.province)
    cities: City[];

    @OneToMany(() => Address, address => address.province)
    addresses: Address[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}