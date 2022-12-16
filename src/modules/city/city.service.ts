import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base.service';
import { Repository } from 'typeorm';
import { Store } from '../store/entities/store.entity';
import { City } from './entities/city.entity';

@Injectable()
export class CityService extends BaseService<City> {
 
  constructor(
    @InjectRepository(City) repository: Repository<City>,
    @InjectRepository(Store) private storeRepository: Repository<Store>,) {
    super(repository)
  }

  findAll() {
    return this.repository.find({});
  }

  stores(cityId: any) {
    return this.storeRepository.find({where: {
      city: {id: cityId}
    }})
  }
}
