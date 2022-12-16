import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from "nestjs-seeder";
import { City } from "src/modules/city/entities/city.entity";
import { Repository } from 'typeorm';

@Injectable()
export class CitySeeder implements Seeder {
  constructor(@InjectRepository(City) private repo: Repository<City>) {}

  async seed(): Promise<any> {

    // Generate 10
    const cities = DataFactory.createForClass(City).generate(10);

    return Promise.all(
      cities.map(async city => {
        await this.repo.save(city);
      })
    );
  }

  async drop(): Promise<any> {
    //return this.user.deleteMany({});
  }
}