import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/core/base.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<User> {

  constructor(
    @InjectRepository(User) repository: Repository<User>) {
    super(repository)
  }

  /**
   * get user data with PASSCODE
   * 
   * @param username 
   * @returns 
   */
  getUser(username: string) {
    return this.repository.findOne({
      where: [{ email: username }],
      select: [
        "id", "name", "email", 
        "password", "created_at", "updated_at"
      ]
    })
  }
}
