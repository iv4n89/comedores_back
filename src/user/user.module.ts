import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IdentityDoc } from './entities/identityDoc.entity';
import { Address } from './entities/address.entity';
import { CommPlace } from 'src/comm_place/entities/comm_place.entity';
import { CommPlaceUserRegistry } from 'src/comm_place/entities/user_registry.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, IdentityDoc, Address, CommPlace, CommPlaceUserRegistry])]
})
export class UserModule {}
