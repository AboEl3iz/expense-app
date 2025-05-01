import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginResponse } from './dto/login-reponse';
import { GqlAuthGuard } from 'src/guard/gql-auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { LoginUserInput } from 'src/user/dto/login-user.input';
import { LogoutResponse } from './dto/logout-response';
import { GqlSessionGuard } from 'src/guard/gql-session/gql-session.guard';


@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => Auth)
  // createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
  //   return this.authService.create(createAuthInput);
  // }
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @CurrentUser() user: User,
    @Context() context: any,
  ): Promise<LoginResponse> {
    // @UseGuards(GqlAuthGuard) will handle the authentication and add the user to the request
    return {
      user,
      message: 'Login successful',
    };
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() { req }: any) {
    return this.authService.logout(req);
  }

  @Mutation(() => User)
  @UseGuards(GqlSessionGuard)
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }

  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
