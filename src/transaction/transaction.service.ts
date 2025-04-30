import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
private userRepo: UserService,
) {}
  /**
   * Creates a new transaction.
   * @param createTransactionInput - The details of the transaction to create.
   * @returns The newly created transaction.
   */
  async create(createTransactionInput: CreateTransactionInput): Promise<Transaction> {
  const user =  await this.userRepo.findOne(createTransactionInput.userid)[0];
  if (!user) {
    throw new Error(`User with ID ${createTransactionInput.userid} not found`);
  }
    const newTransaction = this.transactionRepo.create({...createTransactionInput , user: user});
    return await this.transactionRepo.save(newTransaction);
  }

  /**
   * Retrieves all transactions.
   * @returns An array of all transactions.
   */
  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepo.find({
      relations: ['user'],
    });
  }

  /**
   * Retrieves a transaction by its ID.
   * @param id - The ID of the transaction to retrieve.
   * @returns The transaction with the specified ID.
   */
  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOneBy({ id });
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  /**
   * Updates a transaction.
   * @param id - The ID of the transaction to update.
   * @param updateTransactionInput - The new details of the transaction.
   * @returns The updated transaction.
   */
  async update(id: number, updateTransactionInput: UpdateTransactionInput): Promise<Transaction> {
    
    const updatedTransaction = await this.transactionRepo.findOneBy({ id });
    if (!updatedTransaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    updatedTransaction.description = updateTransactionInput.description || updatedTransaction.description;
    updatedTransaction.paymentType = updateTransactionInput.paymentType || updatedTransaction.paymentType;
    updatedTransaction.category = updateTransactionInput.category || updatedTransaction.category;
    updatedTransaction.amount = updateTransactionInput.amount || updatedTransaction.amount;
    updatedTransaction.location = updateTransactionInput.location || updatedTransaction.location;
    updatedTransaction.date = updateTransactionInput.date || updatedTransaction.date;

    
    return  this.transactionRepo.save(updatedTransaction);
  }

  /**
   * Removes a transaction.
   * @param id - The ID of the transaction to remove.
   * @returns A success message.
   */
  async remove(id: number): Promise<string> {
    const result = await this.transactionRepo.delete(id);
    if (result.affected === 0) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    return `Transaction with ID ${id} removed successfully`;
  }
}
