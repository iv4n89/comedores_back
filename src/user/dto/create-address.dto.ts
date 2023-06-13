import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    addrType: string;

    @IsNotEmpty()
    @IsString()
    streetName: string;

    @IsNotEmpty()
    @IsInt()
    streetNumber: number;

    @IsOptional()
    @IsInt()
    floor: number;

    @IsOptional()
    @IsString()
    door: string;

    @IsOptional()
    @IsString()
    extraInfo: string;

    @IsOptional()
    @IsInt()
    country: number;

    @IsOptional()
    @IsInt()
    state: number;

    @IsOptional()
    @IsInt()
    province: number;

    @IsOptional()
    @IsInt()
    city: number;

    @IsOptional()
    postalCode: string;

}