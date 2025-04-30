import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

 
  /**
   * Creates a new user.
   * @param createUserInput - The user's details.
   * @returns The newly created user.
   */
  async create(createUserInput: CreateUserInput) {
    const verifieduser = await this.userRepo.findOneBy({ username: createUserInput.username });
    if (verifieduser) {
      throw new Error('User already exists');
    }
    const hashPassword = await this.hashPassword(createUserInput.password);
    if(!createUserInput.profilePicture){
      if(createUserInput.gender == 'male'){
        createUserInput.profilePicture = 'https://avatar.iran.liara.run/public/boy'
      }else{

        createUserInput.profilePicture = 'https://avatar.iran.liara.run/public/girl'
      }
    }
    const newuser = this.userRepo.save({ ...createUserInput, password: hashPassword });

    return newuser;
  }

  /**
   * Finds all users.
   * @returns An array of users.
   */
  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  /**
   * Finds a user by ID.
   * @param id - The user's ID.
   * @returns The user.
   */
  async findOne(id: number) {
    const user = await this.userRepo.find({ where: { id } ,relations: ['transactions'] });
    if (!user) {
      throw new Error('User not found');
    }
    return user;


  }

  /**
   * Updates a user.
   * @param id - The user's ID.
   * @param updateUserInput - The user's new details.
   * @returns The updated user.
   */
async  update(id: number, updateUserInput: UpdateUserInput) {
  const user = await this.userRepo.findOneBy({ id });
  if (!user) {
    throw new Error('User not found');
  }
  
  user.name = updateUserInput.name || user.name;
    if (updateUserInput.password) {
      const hashPassword = await this.hashPassword(updateUserInput.password);
      user.password =  hashPassword;
    }
    
    return this.userRepo.save(user);
  }

  /**
   * Deletes a user.
   * @param id - The user's ID.
   * @returns A success message.
   */
 async remove(id: number) {
    await this.userRepo.delete(id );
    return "User deleted successfully";
  }

  /**
   * Logs a user in.
   * @param loginInput - The user's login details.
   * @returns The user.
   */
  async login(loginInput: LoginUserInput) {
    const user = await this.userRepo.findOneBy({ username: loginInput.username });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(loginInput.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  }
  private async hashPassword(password: String): Promise<String> {
    let salt = 10;
    return bcrypt.hash(password, salt);
  }
}
