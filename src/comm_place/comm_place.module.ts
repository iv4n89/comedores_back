import { Module } from '@nestjs/common';
import { CommPlaceService } from './comm_place.service';
import { CommPlaceController } from './comm_place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommPlace } from './entities/comm_place.entity';
import { CommPlaceUserRegistry } from './entities/user_registry.entity';
import { CommunityEntity } from './entities/comm_entity.entity';
import { CommunityEntityPerson } from './entities/comm_entity_person.entity';
import { CommunityEntityService } from './comm_entity.service';
import { CommEntityController } from './comm_entity.controller';
import { CommunityPersonController } from './comm_person.controller';
import { CommunityPersonService } from './comm_person.service';
import { Address } from 'src/user/entities/address.entity';

@Module({
  controllers: [CommPlaceController, CommEntityController, CommunityPersonController],
  providers: [CommPlaceService, CommunityEntityService, CommunityPersonService],
  imports: [TypeOrmModule.forFeature([CommPlace,CommPlaceUserRegistry, CommunityEntity, CommunityEntityPerson, Address])],
  exports: [CommunityPersonService]
})
export class CommKitchenModule {}
