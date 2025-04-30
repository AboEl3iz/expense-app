import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateTransactionInput } from './create-transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput extends PartialType(CreateTransactionInput) {
  @Field(() => String, { description: 'Example field (description)', nullable: true })
  @IsString()
  @IsOptional()
   description?: String
   
   @Field(() => String, { description: 'Example field (paymentType)', nullable: true })
   @IsString()
   @IsOptional()
   paymentType?: String
   
   @Field(() => String, { description: 'Example field (category)', nullable: true })
   @IsString()
   @IsOptional()
   category?: String

   @Field(() => Int, { description: 'Example field (amount)', nullable: true })
   @IsInt()
   @IsOptional()
   amount?: number
  
   @Field(() => String, { description: 'Example field (location)', nullable: true })
   @IsString()
   @IsOptional()
   location?: String
   
   @Field(() => String, { description: 'Example field (data)', nullable: true })
   @IsString()
   @IsOptional()
   date?: String
}
