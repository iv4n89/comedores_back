import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Province } from "../entities/province.entity";

export class CreateCityDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    postalCode: string;

    @IsNotEmpty()
    province: Partial<Province>;
}