import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User , { name: 'register' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }


  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }
  @Auth()
  @Query(() => User, { name: 'user' })
  findOne(@CurrentUser() user: User,) {
    return this.userService.findOne(user.id );
  }
  @Auth()
  @Mutation(() => User)
  updateUser(@CurrentUser() user: User ,@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(user.id,updateUserInput);
  }
  @Auth()
  @Mutation(() => String , { name: 'removeUser' })
  removeUser(@CurrentUser() user: User) {
    return this.userService.remove(user.id);
  }
}
