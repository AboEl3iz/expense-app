import { IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
    @IsString()
    @IsOptional()
  @Field(() => String, { description: 'Example field (name)', nullable: true  })
  name: String
  @IsString()
    @IsOptional()
  @Field(() => String, { description: 'Example field (password)' , nullable: true })
  password: String
}
