import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCommunityEntityDto } from './dto/create-comm_entity.dto';
import { UpdateCommunityEntityDto } from './dto/update-comm_entity.dto';
import { CommunityEntity } from './entities/comm_entity.entity';
import { CommunityEntityPerson } from './entities/comm_entity_person.entity';
import { CommPlace } from './entities/comm_place.entity';

@Injectable()
export class CommunityEntityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly commEntityRepository: Repository<CommunityEntity>,
    @InjectRepository(CommunityEntityPerson)
    private readonly commEntityPersonRepository: Repository<CommunityEntityPerson>,
    @InjectRepository(CommPlace)
    private readonly commPlaceRepository: Repository<CommPlace>,
  ) {}

  async create(createCommEntityDto: CreateCommunityEntityDto) {
    if (
      createCommEntityDto?.applicableRate &&
      ![0.5, 0.75, 2.5].includes(createCommEntityDto.applicableRate)
    ) {
      throw new HttpException(
        `Applicable rate of ${createCommEntityDto.applicableRate} is not a valid value`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const commEntity = this.commEntityRepository.create({
      name: createCommEntityDto.name,
      nif: createCommEntityDto.nif,
      applicableRate: createCommEntityDto?.applicableRate || 0.5,
    });

    if (createCommEntityDto?.places) {
      const places = await this.commPlaceRepository.find({ where: { id: In(createCommEntityDto.places) } });
      commEntity.commPlaces = places;
    }

    const entity = await this.commEntityRepository.save(commEntity);

    if (createCommEntityDto?.person) {
      const _person = this.commEntityPersonRepository.create({
        ...createCommEntityDto.person,
        username: `${createCommEntityDto.person.name
          .charAt(0)
          .toLowerCase()}${createCommEntityDto.person.surname
          .split(' ')[0]
          .toLowerCase()}`,
      });
      _person.entity = entity;
      await this.commEntityPersonRepository.save(_person);
    }

    return entity;
  }

  findAll() {
    return this.commEntityRepository.find({ relations: {
        commPlaces: true,
        person: true,
    } });
  }

  findOne(id: number) {
    return this.commEntityRepository.findOneOrFail({
      where: { id },
      relations: {
        commPlaces: true,
        person: true,
      }
    });
  }

  async update(id: number, updateCommEntityDto: UpdateCommunityEntityDto) {
    if (
      updateCommEntityDto?.applicableRate &&
      ![0.5, 0.75, 2.5].includes(updateCommEntityDto.applicableRate)
    ) {
      throw new HttpException(
        `Applicable rate of ${updateCommEntityDto.applicableRate} is not a valid value`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const _commEntity = await this.findOne(id);
    if (updateCommEntityDto?.person) {
      const responsible = _commEntity.person;
      if (!responsible) {
        const _person = this.commEntityPersonRepository.create({
          ...updateCommEntityDto.person,
          username: `${updateCommEntityDto.person.name
            .charAt(0)
            .toLowerCase()}${updateCommEntityDto.person.surname
            .split(' ')[0]
            .toLowerCase()}`,
        });
        const __person = await this.commEntityPersonRepository.save(_person);
        _commEntity.person = __person;
        delete updateCommEntityDto.person;
      } else {
        if (
          updateCommEntityDto?.person.name ||
          updateCommEntityDto.person.surname
        ) {
          responsible.username = `${updateCommEntityDto.person.name
            .charAt(0)
            .toLowerCase()}${updateCommEntityDto.person.surname
            .split(' ')[0]
            .toLowerCase()}`;
        }
        Object.assign(responsible, updateCommEntityDto.person);
        const _person = await this.commEntityPersonRepository.save(responsible);
        _commEntity.person = _person;
        delete updateCommEntityDto.person;
      }
    }
    if (updateCommEntityDto?.places) {
      const places = await this.commPlaceRepository.find({ where: { id: In(updateCommEntityDto.places) } });
      _commEntity.commPlaces = places;
      delete updateCommEntityDto.places;
    }
    Object.assign(_commEntity, updateCommEntityDto);
    return this.commEntityRepository.save(_commEntity);
  }

  delete(id: number) {
    return this.commEntityRepository.softDelete({ id });
  }
}
