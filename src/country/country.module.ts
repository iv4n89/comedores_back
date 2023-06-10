import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { Province } from './entities/province.entity';
import { State } from './entities/state.entity';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  controllers: [
    CountryController,
    StateController,
    ProvinceController,
    CityController,
  ],
  providers: [CountryService, StateService, ProvinceService, CityService],
  imports: [TypeOrmModule.forFeature([Country, State, City, Province])],
})
export class CountryModule {}
