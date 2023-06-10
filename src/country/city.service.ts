import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { City } from "./entities/city.entity";

@Injectable() 
export class CityService {
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) {}

    create(createCityDto: CreateCityDto) {
        const city = this.cityRepository.create({
            ...createCityDto,
            province: typeof createCityDto.province === 'number' ? { id: createCityDto.province as number } : createCityDto.province
        });
        return this.cityRepository.save(city);
    }

    findAll() {
        return this.cityRepository.find({ loadEagerRelations: true });
    }

    findAllByPronviceId(id: number) {
        return this.cityRepository.find({ where: { province: { id } }, loadEagerRelations: true });
    }

    findOne(id: number) {
        return this.cityRepository.findOneOrFail({ where: { id }, loadEagerRelations: true });
    }

    async update(id: number, updateCityDto: UpdateCityDto) {
        const city = await this.findOne(id);
        Object.assign(city, updateCityDto);
        return this.cityRepository.save(city);
    }

    delete(id: number) {
        return this.cityRepository.softDelete({ id });
    }
}