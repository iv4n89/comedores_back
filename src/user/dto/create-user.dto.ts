import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Address } from "../entities/address.entity";
import { IdentityDoc } from "../entities/identityDoc.entity";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    surname: string;
    
    @IsNotEmpty()
    @IsPhoneNumber('ES')
    @IsString()
    telNumber: string;

    @IsOptional()
    identityDoc?: Partial<IdentityDoc>;

    @IsOptional()
    address?: Partial<Address>;

    @IsOptional()
    places?: number[];

}
