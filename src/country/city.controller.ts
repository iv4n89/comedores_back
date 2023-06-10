import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";


@Controller('address/city')
export class CityController {
    constructor(
        private readonly cityService: CityService,
    ) {}

    @Get()
    public findAll() {
        return this.cityService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id', ParseIntPipe) id: number) {
        return this.cityService.findOne(id);
    }

    @Get('province/:id')
    public findByProvinceId(@Param('id', ParseIntPipe) id: number) {
        return this.cityService.findAllByPronviceId(id);
    }

    @Post()
    public create(@Body() body: CreateCityDto) {
        return this.cityService.create(body);
    }

    @Patch(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCityDto) {
        return this.cityService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number) {
        return this.cityService.delete(id);
    }
}