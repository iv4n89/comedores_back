import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Address } from "src/user/entities/address.entity";
import { CommunityEntityPerson } from "../entities/comm_entity_person.entity";
import { CommPlaceType } from "../entities/comm_place.entity";

export class CreateCommPlaceDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    cif: string;

    @IsOptional()
    @IsString()
    type?: CommPlaceType;

    @IsOptional()
    telephone?: string;

    @IsOptional()
    address?: Partial<Address>;

    @IsOptional()
    entity?: number[];

    @IsOptional()
    @IsInt()
    responsiblePerson: Partial<CommunityEntityPerson>;

}
