import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/user/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateCommPlaceDto } from './dto/create-comm_place.dto';
import { UpdateCommPlaceDto } from './dto/update-comm_place.dto';
import { CommunityEntity } from './entities/comm_entity.entity';
import { CommunityEntityPerson } from './entities/comm_entity_person.entity';
import { CommPlace, CommPlaceType } from './entities/comm_place.entity';

@Injectable()
export class CommPlaceService {
  constructor(
    @InjectRepository(CommPlace)
    private readonly commPlaceRepository: Repository<CommPlace>,
    @InjectRepository(CommunityEntity)
    private readonly commEntityRepository: Repository<CommunityEntity>,
    @InjectRepository(CommunityEntityPerson)
    private readonly commPersonRepository: Repository<CommunityEntityPerson>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createCommPlaceDto: CreateCommPlaceDto) {
    const commPlace = this.commPlaceRepository.create({
      cif: createCommPlaceDto.cif,
      name: createCommPlaceDto?.name,
      telephnone: createCommPlaceDto?.telephone,
      type: createCommPlaceDto?.type || 'community kitchen',
    });

    if (createCommPlaceDto.responsiblePerson) {
      const responsible = this.commPersonRepository.create({
        ...createCommPlaceDto.responsiblePerson,
        username: `${createCommPlaceDto.responsiblePerson.name.charAt(0).toLowerCase()}${createCommPlaceDto.responsiblePerson.surname.toLowerCase()}`
      });
      commPlace.responsiblePerson = responsible;
    }

    if (createCommPlaceDto?.address) {
      const _address = this.addressRepository.create(createCommPlaceDto.address);
      const address = await this.addressRepository.save(_address);
      commPlace.address = address;
    }

    if (createCommPlaceDto?.entity) {
      const entities = [];
      for (const ent of createCommPlaceDto?.entity) {
        const _ent = await this.commEntityRepository.findOneOrFail({ where: { id: ent } });
        entities.push(_ent);
      }
      commPlace.entity = entities;
    }

    return this.commPlaceRepository.save(commPlace);
    
  }

  findKitchensOrStores(type: CommPlaceType) {
    return this.commPlaceRepository.find({
      where: { type },
      loadEagerRelations: true
    });
  }

  findAll() {
    return this.commPlaceRepository.find({ loadEagerRelations: true });
  }

  findOne(id: number) {
    return this.commPlaceRepository.findOneOrFail({ where: { id }, loadEagerRelations: true });
  }

  async update(id: number, updateCommPlaceDto: UpdateCommPlaceDto) {
    const place = await this.findOne(id);
    if (updateCommPlaceDto?.address) {
      if (place?.address) {
        const _address = place.address;
        Object.assign(_address, updateCommPlaceDto.address);
        const address = await this.addressRepository.save(_address);
        place.address = address;
      } else {
        const _address = this.addressRepository.create(updateCommPlaceDto.address);
        const address = await this.addressRepository.save(_address);
        place.address = address;
      }
        delete updateCommPlaceDto.address;
    }

    if (updateCommPlaceDto?.responsiblePerson) {
      const person = await this.commPersonRepository.findOneOrFail({
        where: { 
          id: place.responsiblePerson.id
        } 
      });
      Object.assign(person, updateCommPlaceDto.responsiblePerson);
      place.responsiblePerson = person;
      delete updateCommPlaceDto.responsiblePerson;
    }

    if (updateCommPlaceDto?.entity) {
      if (Array.isArray(updateCommPlaceDto?.entity)) {
        for (const ent of updateCommPlaceDto?.entity) {
          const _ent = await this.commEntityRepository.findOneOrFail({ where: { id: ent } });
          place.entity = [...(place.entity.filter(e => e.id !== ent)), _ent];
        }
      } else {
        const entity = await this.commEntityRepository.findOneOrFail({ where: { id: updateCommPlaceDto.entity } });
        place.entity = [...(place.entity.filter(ent => ent.id !== entity.id)), entity];
      }
      delete updateCommPlaceDto.entity;
    }

    Object.assign(place, updateCommPlaceDto);
    return this.commPlaceRepository.save(place);
  }

  remove(id: number) {
    return this.commPlaceRepository.softDelete({ id });
  }
}
