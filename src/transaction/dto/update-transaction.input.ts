import { CreateTransactionInput } from './create-transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput extends PartialType(CreateTransactionInput) {
  @Field(() => String, { description: 'Example field (description)', nullable: true })
   description: String
   
   @Field(() => String, { description: 'Example field (paymentType)', nullable: true })
   paymentType: String
   
   @Field(() => String, { description: 'Example field (category)', nullable: true })
   category: String

   @Field(() => Int, { description: 'Example field (amount)', nullable: true })
   amount: number
  
   @Field(() => String, { description: 'Example field (location)', nullable: true })
   location: String
   
   @Field(() => String, { description: 'Example field (data)', nullable: true })
   date: String
}
