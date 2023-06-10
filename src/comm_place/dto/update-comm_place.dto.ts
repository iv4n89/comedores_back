import { PartialType } from '@nestjs/mapped-types';
import { CreateCommPlaceDto } from './create-comm_place.dto';

export class UpdateCommPlaceDto extends PartialType(CreateCommPlaceDto) {}
