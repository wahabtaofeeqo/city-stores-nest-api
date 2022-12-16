import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { City } from '../city/entities/city.entity';
import { Store } from './entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, City, Store])
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
