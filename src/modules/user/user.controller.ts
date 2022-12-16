import { Controller, Req, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { BaseController } from 'src/core/base.controller';
import { JwtGuard } from 'src/guards/jwt-guard';
import { UserService } from './user.service';

@ApiTags("User")
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtGuard)
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get("me")
  profile(@Req() req) {
    return this.okResponse('My Profile', req.user);
  }
}
