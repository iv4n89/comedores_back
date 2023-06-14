import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CommunityEntityPerson } from "../entities/comm_entity_person.entity";


export class CreateCommunityEntityDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    nif: string;

    @IsOptional()
    applicableRate?: 0.50 | 0.75 | 2.50;

    @IsOptional()
    person?: Partial<CommunityEntityPerson>;

    @IsOptional()
    places?: number[];

}