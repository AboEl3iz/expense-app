import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction , { name: 'createTransaction' })
  createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput) {
    return this.transactionService.create(createTransactionInput);
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionService.findAll();
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(@Args('id', { type: () => Int }) id: number,@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    return this.transactionService.update(id, updateTransactionInput);
  }

  @Mutation(() => String , { name: 'removeTransaction' })
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.remove(id);
  }
}
