import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
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
    // Save the new user in the database
    return await this.userRepo.save(newUser);
  }

  // Return all users
  async findAll() {
    return await this.userRepo.find();
  }

  // Find a user by id
  async findOne(id: number) {
    return await this.userRepo.findOne(id);
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto) { 
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, updateUserDto); 
    return this.userRepo.save(user);
  }

  // Delete a user
  async remove(id: number) {
    await this.userRepo.delete(id);
    return true;
  }
}
