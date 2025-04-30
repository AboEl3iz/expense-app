import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [TransactionResolver, TransactionService],
  imports:[
    TypeOrmModule.forFeature([Transaction , User]),UserModule
  ]
})
export class TransactionModule {}
