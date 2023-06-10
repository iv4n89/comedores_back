import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStateDto } from "./dto/create-state.dto";
import { UpdateStateDto } from "./dto/update-state.dto";
import { State } from "./entities/state.entity";


@Injectable()
export class StateService {
    constructor(
        @InjectRepository(State)
        private readonly stateRepository: Repository<State>,
    ) {}

    create(createStateDto: CreateStateDto) {
        const state = this.stateRepository.create({
            ...createStateDto,
            country: typeof createStateDto.country === 'number' ? { id: createStateDto.country as number } : createStateDto.country
        });
        return this.stateRepository.save(state);
    }

    findAll() {
        return this.stateRepository.find({ loadEagerRelations: true });
    }

    findByCountryId(id: number) {
        return this.stateRepository.find({ where: { country: { id } }, loadEagerRelations: true });
    }

    findOne(id: number) {
        return this.stateRepository.findOneOrFail({ where: { id }, loadEagerRelations: true });
    }

    async update(id: number, updateStateDto: UpdateStateDto) {
        const _state = await this.findOne(id);
        Object.assign(_state, updateStateDto);
        return this.stateRepository.save(_state);
    }

    delete(id: number) {
        return this.stateRepository.softDelete({ id });
    }
}