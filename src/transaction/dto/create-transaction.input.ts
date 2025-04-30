import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Example field (description)' })
   description: String
   @IsString()
  @IsNotEmpty()
   @Field(() => String, { description: 'Example field (paymentType)' })
   paymentType: String
   @IsString()
  @IsNotEmpty()
   @Field(() => String, { description: 'Example field (category)' })
   category: String
   @IsString()
   @IsNotEmpty()
   @Field(() => Int, { description: 'Example field (amount)' })
   amount: number
   @IsString()
   @IsNotEmpty()
   @Field(() => String, { description: 'Example field (location)' })
   location: String
   @IsString()
  @IsNotEmpty()
   @Field(() => String, { description: 'Example field (data)' })
   date: String
   
   @Field(() => Int, { description: 'Example field (amount)' })
   userid :number
}
