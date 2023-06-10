import { PartialType } from "@nestjs/mapped-types";
import { CreateCommunityPersonDto } from "./create-comm_person.dto";


export class UpdateCommunityPersonDto extends PartialType(CreateCommunityPersonDto) {}