import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommunityPersonDto } from "./dto/create-comm_person.dto";
import { UpdateCommunityPersonDto } from "./dto/update-comm_person.dto";
import { CommunityEntityPerson } from "./entities/comm_entity_person.entity";


@Injectable()
export class CommunityPersonService {

    constructor(
        @InjectRepository(CommunityEntityPerson)
        private readonly commPersonRepository: Repository<CommunityEntityPerson>,
    ) {}

    login(username: string) {
        return this.commPersonRepository.findOneOrFail({
            where: { username },
            loadEagerRelations: true
        });
    }

    create(createCommPersonDto: CreateCommunityPersonDto) {
        const username = createCommPersonDto.name.charAt(0).toLowerCase() + createCommPersonDto.surname.toLowerCase();
        const testPassword = '123123';
        const person = this.commPersonRepository.create({
            ...createCommPersonDto,
            username,
            password: createCommPersonDto?.password ? createCommPersonDto?.password : testPassword,
            entity: { id: createCommPersonDto.entity }
        });
        return this.commPersonRepository.save(person);
    }

    findAll() {
        return this.commPersonRepository.find({ loadEagerRelations: true });
    }

    findOne(id: number) {
        return this.commPersonRepository.findOneOrFail({ where: { id }, loadEagerRelations: true });
    }
    
    async update(id: number, updateCommPersonDto: UpdateCommunityPersonDto) {
        const person = await this.findOne(id);
        Object.assign(person, updateCommPersonDto);
        return this.commPersonRepository.save(person);
    }

    delete(id: number) {
        return this.commPersonRepository.softDelete({ id });
    }

}