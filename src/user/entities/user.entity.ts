import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
  @Column({unique: true})
  @Field(() => String, { description: 'Example field (placeholder)' })
  username: String
  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: String
  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  password: String
  @Column({nullable: true})
  @Field(() => String, {nullable: true, description: 'Example field (placeholder)' })
  profilePicture?: String
  @Column({type: 'enum', enum: ['male', 'female']})
  @Field(() => String, { description: 'Example field (placeholder)' })
  gender: String

  
}
