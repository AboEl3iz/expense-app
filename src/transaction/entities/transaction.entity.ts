import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number
  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: String
  @Column({type: 'enum', enum: ['card', 'cash']})
  @Field(() => String, { description: 'Example field (placeholder)' })
  paymentType: String
  @Column({type: 'enum', enum: ["saving", "expense", "investment"]})
  @Field(() => String, { description: 'Example field (placeholder)' })
  category: String
  @Column()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  amount: number
  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  location: String
  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  date: String
  
}
