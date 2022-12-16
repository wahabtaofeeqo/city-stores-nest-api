import { Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common/interfaces/hooks';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  getHello(): any {
    return {
      status: true,
      message: 'You are on the right track! 🥂'
    }
  }

  onApplicationBootstrap() {
    
  }
}
