import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CommunityPersonService } from "./comm_person.service";
import { CreateCommunityPersonDto } from "./dto/create-comm_person.dto";
import { UpdateCommunityPersonDto } from "./dto/update-comm_person.dto";


@Controller('comm-person')
export class CommunityPersonController {

    constructor(
        private readonly commPersonService: CommunityPersonService,
    ) {}

    @Get()
    public findAll() {
        return this.commPersonService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id', ParseIntPipe) id: number) {
        return this.commPersonService.findOne(id);
    }

    @Post()
    public create(@Body() body: CreateCommunityPersonDto) {
        return this.commPersonService.create(body);
    }

    @Patch(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCommunityPersonDto) {
        return this.commPersonService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number) {
        return this.commPersonService.delete(id);
    }

}