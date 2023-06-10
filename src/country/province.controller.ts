import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";
import { ProvinceService } from "./province.service";

@Controller('address/province')
export class ProvinceController {
    constructor(
        private readonly provinceService: ProvinceService,
    ) {}

    @Get()
    public findAll() {
        return this.provinceService.findAll();
    }

    @Get('state/:id')
    public findByStateId(@Param('id', ParseIntPipe) id: number) {
        return this.provinceService.findByStateId(id);
    }

    @Get(':id')
    public findOne(@Param('id', ParseIntPipe) id: number) {
        return this.provinceService.findOne(id);
    }

    @Post()
    public create(@Body() body: CreateProvinceDto) {
        return this.provinceService.create(body);
    }

    @Patch(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProvinceDto) {
        return this.provinceService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number) {
        return this.provinceService.delete(id);
    }
}