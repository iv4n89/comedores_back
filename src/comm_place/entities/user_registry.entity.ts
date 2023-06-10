import { IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { AfterLoad, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommPlace, CommPlaceType } from "./comm_place.entity";


@Entity({ name: 'comm_place_user_registry' })
export class CommPlaceUserRegistry {

    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', unsigned: true })
    id: number;

    @ManyToOne(() => User, user => user.commKitchenRegistry, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => CommPlace, commPlace => commPlace.userRegistry, { nullable: false, eager: true })
    @JoinColumn({ name: 'comm_kitchen_id' })
    commPlace: CommPlace;

    @IsOptional()
    type: CommPlaceType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @AfterLoad()
    getType() {
        if (this.commPlace) {
            this.type = this.commPlace.type;
        }
    }

}