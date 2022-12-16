import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { BaseController } from 'src/core/base.controller';
import { JwtGuard } from 'src/guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

@ApiTags("Store")
@Controller('stores')
export class StoreController extends BaseController {
  constructor(private readonly storeService: StoreService) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async create(@Req() req, @Body() createStoreDto: CreateStoreDto) {
    const store = await this.storeService.createStore(req.user, createStoreDto)
    return this.okResponse("Store created successfully", store);
  }

  @Get()
  async findAll() {
    const stores = await this.storeService.getAll();
    return this.okResponse('Stores', stores);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const store = await this.storeService.findOne({id});
    return this.okResponse('Stores', store);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    const store = await this.storeService.updateStore(id, updateStoreDto);
    return this.okResponse("Store updated successfully", store);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    const store = this.storeService.remove(id);
    return this.okResponse("Store deleted successfully", store);
  }
}
