import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (username)' })
  username: String
  @Field(() => String, { description: 'Example field (name)'   })
  name: String
  @Field(() => String, { description: 'Example field (password)' })
  password: String
  @Field(() => String, { description: 'Example field (gender)' })
  gender: String
}
