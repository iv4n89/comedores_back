import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommPlace } from 'src/comm_place/entities/comm_place.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { IdentityDoc } from './entities/identityDoc.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(IdentityDoc)
    private readonly identityDocRepository: Repository<IdentityDoc>,
    @InjectRepository(CommPlace)
    private readonly commPlaceRepository: Repository<CommPlace>,
  ) {}

  async create(createUserDto: CreateUserDto) {

    const _user = new User();
    _user.name = createUserDto.name;
    _user.surname = createUserDto.surname;
    _user.telNumber = createUserDto.telNumber;

    if (createUserDto?.address) {
      const _address = this.addressRepository.create(createUserDto.address);
      const address = await this.addressRepository.save(_address);
      _user.address = address;
    }

    if (createUserDto?.identityDoc) {
      const _idDoc = this.identityDocRepository.create(createUserDto.identityDoc);
      const idDoc = await this.identityDocRepository.save(_idDoc);
      _user.identityDoc = idDoc;
    }

    if (createUserDto?.places) {
      const places = await this.commPlaceRepository.find({
        where: {
          id: In(createUserDto?.places)
        },
        loadEagerRelations: true
      });
      _user.commPlaces = places;
    }

    return this.userRepository.save({
      ..._user,
    });
    
  }

  findAll() {
    return this.userRepository.find({ loadEagerRelations: true });
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail({ where: { id }, loadEagerRelations: true });
  }

  findByName(name: string, surname?: string) {
    return this.userRepository.findOneOrFail({ where: { name, surname }, loadEagerRelations: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto?.address) {
      if (user?.address) {
        const _address = user.address;
        Object.assign(_address, updateUserDto.address);
        const address = await this.addressRepository.save(_address);
        user.address = address;
      } else {
        const _address = this.addressRepository.create(updateUserDto.address);
        const address = await this.addressRepository.save(_address);
        user.address = address;
      }
      delete updateUserDto.address;
    }

    if (updateUserDto?.identityDoc) {
      if (user.identityDoc) {
        const _idDoc = user.identityDoc;
        Object.assign(_idDoc, updateUserDto.identityDoc);
        const idDoc = await this.identityDocRepository.save(_idDoc);
        user.identityDoc = idDoc;
      } else {
        const _idDoc = this.identityDocRepository.create(updateUserDto.identityDoc);
        const idDoc = await this.identityDocRepository.save(_idDoc);
        user.identityDoc = idDoc;
      }
        delete updateUserDto.identityDoc;
    }

    if (updateUserDto?.places) {
      const places = await this.commPlaceRepository.find({
        where: {
          id: In(updateUserDto?.places)
        },
        loadEagerRelations: true
      });
      user.commPlaces = places;
      delete updateUserDto?.places;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);

  }

  remove(id: number) {
    return this.userRepository.softDelete({ id });
  }
}
