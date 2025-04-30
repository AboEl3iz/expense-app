import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Unique } from 'typeorm';

@InputType()
export class LoginUserInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Example field (username)' })
  username: String

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Example field (password)' })
  password: String
  
}