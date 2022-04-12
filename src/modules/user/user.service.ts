import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) 
      private userRepo: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Verify if user already exists
    const user = await this.userRepo.findOne({ email: createUserDto.email });
    if (user) {
      throw new Error('User already exists');
    }
    // Encrypting password with bcrypt
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    // Creating the new user
    const newUser = new UserEntity();
    newUser.name = createUserDto.name;
    newUser.surname = createUserDto.surname;
    newUser.email = createUserDto.email;
    newUser.password = password;
    newUser.address = createUserDto.address;
    // Save the new user in the database and return without password field
    const ans = await this.userRepo.save(newUser);
    return { id: ans.id, name: ans.name, surname: ans.surname, email: ans.email, address: ans.address };
    // await this.userRepo.save(newUser);
    // return this.userRepo.findOne( {  ,select: ['id', 'name', 'surname', 'email', 'address'] });
  }

  // Return all users
  async findAll() {
    // Return all users from the database without password field
    // return await this.userRepo.find();
    return await this.userRepo.find({ select: ['id', 'name', 'surname', 'email', 'address'] });
  }

  // Find a user by id
  async findOne(id: number) {
    // Verify if user exists
    const user = await this.userRepo.findOne({ id: id });
    if (!user) {
      // If user doesn't exists, throw an error 404 and return
      throw new HttpException(`User with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }
    // return user;    
    return { id: user.id, name: user.name, surname: user.surname, email: user.email, address: user.address };
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto) { 
    // Verify if user to update exists
    const user = await this.userRepo.findOne({ email: updateUserDto.email });      
    if (!user) {
      // If user doesn't exists, throw an error 404
      throw new HttpException('User to update not found', HttpStatus.NOT_FOUND);
    }
    this.userRepo.merge(user, updateUserDto); 
    return this.userRepo.save(user);
  }

  // Delete a user by id
  async remove(id: number) {
    // Verify if user to delete exists
    const user = await this.userRepo.findOne({ id: id });
    if (!user) {
      // If user doesn't exists, throw an error 404
      throw new HttpException('User to delete not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepo.delete(id);
    return { id: id, name: user.name, surname: user.surname, email: user.email, address: user.address };
  }
}
