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
  /**
   * Validates a user with the given username and password.
   * @param username The username to validate.
   * @param password The password to validate.
   * @returns The validated user if valid, otherwise null.
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  /**
   * Logs in a user with the given credentials.
   * @param user The user to log in.
   * @returns The logged in user.
   */
  async login(user: any) {
    // You can add additional logic here if needed
    return user;
  }

  /**
   * Logs out the current user.
   * @param req The request object.
   * @returns A success message.
   */
  async logout(req: any) {
    await req.session.destroy();
    
    return { message: 'Logout successful' };
  }

  /**
   * Retrieves the profile of the current user.
   * @param user The current user.
   * @returns The profile of the current user.
   */
  @Mutation(() => User)
  @UseGuards(GqlSessionGuard)
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
