import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => String, { description: 'Example field (description)' })
   description: String
   
   @Field(() => String, { description: 'Example field (paymentType)' })
   paymentType: String
   
   @Field(() => String, { description: 'Example field (category)' })
   category: String

   @Field(() => Int, { description: 'Example field (amount)' })
   amount: number
  
   @Field(() => String, { description: 'Example field (location)' })
   location: String
   
   @Field(() => String, { description: 'Example field (data)' })
   date: String
}
