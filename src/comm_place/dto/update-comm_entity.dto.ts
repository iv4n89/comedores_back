import { PartialType } from "@nestjs/mapped-types";
import { CreateCommunityEntityDto } from "./create-comm_entity.dto";


export class UpdateCommunityEntityDto extends PartialType(CreateCommunityEntityDto) {}