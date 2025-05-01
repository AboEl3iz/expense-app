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
   * @param userid - The ID of the user associated with the transaction.
   * @returns The newly created transaction.
   */
  async create(userid: number,createTransactionInput: CreateTransactionInput): Promise<Transaction> {
  const user =  await this.userRepo.findOne(userid);
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
   * @param userid - The ID of the user associated with the transaction.
   * @returns The transaction with the specified ID.
   */
  async findOne(userid: number, id: number): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    if (transaction.user.id !== userid) {
      throw new Error(`Transaction with ID ${id} does not belong to user with ID ${userid}`);
    }
    return transaction;
  }

  /**
   * Updates a transaction.
   * @param id - The ID of the transaction to update.
   * @param updateTransactionInput - The new details of the transaction.
   * @returns The updated transaction.
   */
  async update(userid: number, id: number, updateTransactionInput: UpdateTransactionInput): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    if (transaction.user.id !== userid) {
      throw new Error(`Transaction with ID ${id} does not belong to user with ID ${userid}`);
    }

    transaction.description = updateTransactionInput.description || transaction.description;
    transaction.paymentType = updateTransactionInput.paymentType || transaction.paymentType;
    transaction.category = updateTransactionInput.category || transaction.category;
    transaction.amount = updateTransactionInput.amount || transaction.amount;
    transaction.location = updateTransactionInput.location || transaction.location;
    transaction.date = updateTransactionInput.date || transaction.date;

    return this.transactionRepo.save(transaction);
  }

  /**
   * Removes a transaction.
   * @param id - The ID of the transaction to remove.
   * @param userid - The ID of the user associated with the transaction.
   * @returns A success message.
   */
  async remove(userid: number,id: number): Promise<string> {
    const transaction = await this.transactionRepo.findOneBy({ id });
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    if (transaction.user.id !== userid) {
      throw new Error(`Transaction with ID ${id} does not belong to user with ID ${userid}`);
    }
    const result = await this.transactionRepo.delete(id);
    if (result.affected === 0) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    return `Transaction with ID ${id} removed successfully`;
  }
}
