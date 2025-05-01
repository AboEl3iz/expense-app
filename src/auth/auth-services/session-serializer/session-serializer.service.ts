import { Injectable } from '@nestjs/common';

import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';



@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: Function) {
    try {
      const user = await this.userService.findOne(+userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
