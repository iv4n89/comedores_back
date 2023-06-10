import { IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";


export class CreateCommunityPersonDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsPhoneNumber('ES')
    @IsString()
    telephone: string;

    @IsNotEmpty()
    @IsInt()
    entity: number;

    @IsOptional()
    @IsString()
    password?: string;

}