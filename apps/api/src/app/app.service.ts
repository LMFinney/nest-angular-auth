import { Injectable } from '@nestjs/common';
import { Message } from '@nest-angular-auth/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Data retrieved via rest' };
  }
}
