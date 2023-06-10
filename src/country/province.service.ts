import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";
import { Province } from "./entities/province.entity";


@Injectable()
export class ProvinceService {
    constructor(
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>,
    ) {}

    create(createProvinceDto: CreateProvinceDto) {
        const province = this.provinceRepository.create({
            ...createProvinceDto,
            state: typeof createProvinceDto.state === 'number' ? { id: createProvinceDto.state as number } : createProvinceDto.state
        });
        return this.provinceRepository.save(province);
    }

    findAll() {
        return this.provinceRepository.find({ loadEagerRelations: true });
    }

    findByStateId(id: number) {
        return this.provinceRepository.find({ where: { state: { id } }, loadEagerRelations: true });
    }

    findOne(id: number) {
        return this.provinceRepository.findOneOrFail({ where: { id }, loadEagerRelations: true });
    }

    async update(id: number, updateProvinceDto: UpdateProvinceDto) {
        const province = await this.findOne(id);
        Object.assign(province, updateProvinceDto);
        return this.provinceRepository.save(province);
    }

    delete(id: number) {
        return this.provinceRepository.softDelete({ id });
    }
}