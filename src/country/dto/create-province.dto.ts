import { IsNotEmpty, IsString } from "class-validator";
import { State } from "../entities/state.entity";

export class CreateProvinceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    state: Partial<State>
}