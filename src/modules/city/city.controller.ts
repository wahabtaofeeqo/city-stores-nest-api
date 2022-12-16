import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Request } from 'express';
import { BaseController } from 'src/core/base.controller';
import { CityService } from './city.service';

@ApiTags("City")
@Controller('cities')
export class CityController extends BaseController {
  constructor(private readonly cityService: CityService) {
    super()
  }

  @Get()
  async findAll() {
    const data = await this.cityService.findAll();
    return this.okResponse('Cities', data);
  }

  @Get(":id/stores")
  async stores(@Req() req: Request) {
    const data = await this.cityService.stores(req.params.id);
    return this.okResponse('Stores', data);
  }
}
