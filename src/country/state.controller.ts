import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateStateDto } from "./dto/create-state.dto";
import { UpdateStateDto } from "./dto/update-state.dto";
import { StateService } from "./state.service";


@Controller('address/state')
export class StateController {
    constructor(
        private readonly stateService: StateService,
    ) {}

    @Get()
    public findAll() {
        return this.stateService.findAll();
    }

    @Get('country/:id')
    public findByCountryId(@Param('id', ParseIntPipe) id: number) {
        return this.stateService.findByCountryId(id);
    }

    @Get(':id')
    public findOne(@Param('id', ParseIntPipe) id: number) {
        return this.stateService.findOne(id);
    }

    @Post()
    public create(@Body() body: CreateStateDto) {
        return this.stateService.create(body);
    }

    @Patch(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateStateDto) {
        return this.stateService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number) {
        return this.stateService.delete(id);
    }
}