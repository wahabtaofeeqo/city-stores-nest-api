import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base.service';
import { Repository } from 'typeorm';
import { City } from '../city/entities/city.entity';
import { User } from '../user/entities/user.entity';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService extends BaseService<Store> {

  constructor(
    @InjectRepository(Store) repository: Repository<Store>,
    @InjectRepository(City) private cityRepository: Repository<City>) {
    super(repository)
  }

  async createStore(user: User, dto: any) {

    // Find City
    const city = await this.cityRepository.findOneBy({id: dto.city_id});
    if(!city) throw new NotFoundException("City does not exist");
  
    let store = {
      ...dto,
      user,
      city
    }
  
    //
    return super.create(store);
  }

  async updateStore(id: string, dto: UpdateStoreDto) {

    // Find Store
    let store = await this.repository.findOneBy({id});
    if(!store) throw new NotFoundException("Store does not exist");

    //
    store.name = dto.name || store.name;
    store.location = dto.location || store.location


    //
    return super.update(id, store);
   }

  async remove(id: string) {

    // Find Store
    let store = await this.repository.findOneBy({id});
    if(!store) throw new NotFoundException("Store does not exist");

    this.repository.delete(id);

    //
    return store;
   }
}
