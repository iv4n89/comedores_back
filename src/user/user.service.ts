import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommPlace } from 'src/comm_place/entities/comm_place.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { IdentityDoc } from './entities/identityDoc.entity';
import { User } from './entities/user.entity';
import * as qrcode from 'qrcode';
import { CommPlaceUserRegistry } from 'src/comm_place/entities/user_registry.entity';
import { minTypes } from './constants';

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
    @InjectRepository(CommPlaceUserRegistry)
    private readonly userRegistryRepository: Repository<CommPlaceUserRegistry>,
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
      const _idDoc = this.identityDocRepository.create(
        createUserDto.identityDoc,
      );
      const idDoc = await this.identityDocRepository.save(_idDoc);
      _user.identityDoc = idDoc;
    }

    if (createUserDto?.places) {
      const places = await this.commPlaceRepository.find({
        where: {
          id: In(createUserDto?.places),
        },
        loadEagerRelations: true,
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
    return this.userRepository.findOneOrFail({
      where: { id },
      loadEagerRelations: true,
    });
  }

  getQrCode(id: number) {
    return qrcode.toString(
      'http://localhost:4000/user/' + id,
      { type: 'svg' },
      function (err, url) {
        return url;
      },
    );
  }

  async attemptToEnterPlace(id: number, placeId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: {
          identityDoc: true,
          commKitchenRegistry: true,
          commPlaces: true,
          address: true,
        }
      });
      const places = user.commPlaces;
      if (!places.length) {
        throw new Error('The user has no places registered yet.');
      }

      const place = await this.commPlaceRepository.findOneOrFail({
        where: { id: placeId },
      });
      const userRegistry = user.commKitchenRegistry;
      if (
        userRegistry?.length &&
        userRegistry?.some((r) => r.commPlace.id === placeId)
      ) {
        const type = place.type;
        const lastEnter = userRegistry
          .filter((r) => r.commPlace.id === placeId)
          ?.at(-1).createdAt;
        const time = new Date().getTime() - lastEnter.getTime();
        const timeToPass = minTypes[type];
        const canEnter: boolean = time > timeToPass;
        if (!canEnter) {
          let timeToPassStr: string;
          const t = timeToPass - time;
          if (type === 'community kitchen') {
            const hours = Math.floor(t / 1000 / 60 / 60);
            const minutes = Math.floor((t - (hours * 1000 * 60 * 60)) / 1000 / 60);
            const seconds = Math.floor((t - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60)) / 1000);
            timeToPassStr = `${hours} horas, ${minutes} minutos, ${seconds} seconds`; 
          } else if (type === 'company store') {
            const days = Math.floor(t / 1000 / 60 / 60 / 24);
            const hours = Math.floor((t - (days * 1000 * 60 * 60 * 24)) / 1000 / 60 / 60);
            const minutes = Math.floor((t - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60)) / 1000 / 60);
            const seconds = Math.floor((t - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60)) / 1000);
            timeToPassStr = `${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
          }
          return {
            canEnter: false,
            timeToPass: timeToPassStr,
          };
        }
      }
      const newRegistry = this.userRegistryRepository.create({
        commPlace: { id: placeId },
        user: { id },
      });
      await this.userRegistryRepository.save(newRegistry);
      return {
        canEnter: true,
      }
    } catch (err) {
      return {
        canEnter: false,
      };
    }
  }

  findByName(name: string, surname?: string) {
    return this.userRepository.findOneOrFail({
      where: { name, surname },
      loadEagerRelations: true,
    });
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
        const _idDoc = this.identityDocRepository.create(
          updateUserDto.identityDoc,
        );
        const idDoc = await this.identityDocRepository.save(_idDoc);
        user.identityDoc = idDoc;
      }
      delete updateUserDto.identityDoc;
    }

    if (updateUserDto?.places) {
      const places = await this.commPlaceRepository.find({
        where: {
          id: In(updateUserDto?.places),
        },
        loadEagerRelations: true,
      });
      user.commPlaces = [
        ...(places.some((p) => p.type === 'community kitchen') && [
          places.find((p) => p.type === 'community kitchen'),
        ]),
        ...(places.some((p) => p.type === 'company store') && [
          places.find((p) => p.type === 'company store'),
        ]),
      ];
      delete updateUserDto?.places;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.softDelete({ id });
  }
}
