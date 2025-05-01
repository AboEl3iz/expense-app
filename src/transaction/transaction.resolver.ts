import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}
  @Auth()
  @Mutation(() => Transaction , { name: 'createTransaction' })
  createTransaction(@CurrentUser() user: User,@Args('createTransactionInput') createTransactionInput: CreateTransactionInput) {
    return this.transactionService.create(user.id,createTransactionInput);
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionService.findAll();
  }
  @Auth()
  @Query(() => Transaction, { name: 'transaction' })
  findOne(@CurrentUser() user: User,@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.findOne(user.id,id);
  }
  @Auth()
  @Mutation(() => Transaction)
  updateTransaction(@CurrentUser() user: User,@Args('id', { type: () => Int }) id: number,@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    return this.transactionService.update(user.id,id, updateTransactionInput);
  }
  @Auth()
  @Mutation(() => String , { name: 'removeTransaction' })
  removeTransaction(@CurrentUser() user: User,@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.remove(user.id,id);
  }
}
