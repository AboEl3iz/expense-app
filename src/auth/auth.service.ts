import { Injectable, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service'; // Your existing user service
import * as bcrypt from 'bcrypt';
import { CurrentUser } from './decorators/current-user/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { GqlSessionGuard } from 'src/guard/gql-session/gql-session.guard';
import { Mutation } from '@nestjs/graphql';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }
  
  async login(user: any) {
    // You can add additional logic here if needed
    return user;
  }
  
  async logout(req: any) {
   await req.session.destroy();
   
    return { message: 'Logout successful' };
  }
  @Mutation(() => User)
  @UseGuards(GqlSessionGuard)
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}