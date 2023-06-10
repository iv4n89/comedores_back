import { IsNotEmpty, IsString } from "class-validator";
import { Country } from "../entities/country.entity";


export class CreateStateDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    country: Partial<Country>;

}