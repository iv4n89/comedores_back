import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CommunityEntityService } from "./comm_entity.service";
import { CreateCommunityEntityDto } from "./dto/create-comm_entity.dto";
import { UpdateCommunityEntityDto } from "./dto/update-comm_entity.dto";


@Controller('comm-entity')
export class CommEntityController {

    constructor(
        private readonly commEntityService: CommunityEntityService
    ) {}

    @Get()
    public findAll() {
        return this.commEntityService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id', ParseIntPipe) id: number) {
        return this.commEntityService.findOne(id);
    }

    @Post()
    public create(@Body() body: CreateCommunityEntityDto) {
        return this.commEntityService.create(body);
    }


    @Patch(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCommunityEntityDto) {
        return this.commEntityService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number) {
        return this.commEntityService.delete(id);
    }

}