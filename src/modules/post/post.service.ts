import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
      private postRepo: Repository<PostEntity>,
    @InjectRepository(UserEntity) 
      private userRepo: Repository<UserEntity>      
  ) { }
  
  // Create a new post
  async create(createPostDto: CreatePostDto) {
    // Verify if user with the id exists
    const user = await this.userRepo.findOne({ id: createPostDto.userId });
    if (!user) {
      throw new HttpException(`User with id '${createPostDto.userId}' not found`, HttpStatus.NOT_FOUND);
    }
    // Creating the new post
    const newPost = new PostEntity();
    newPost.description = createPostDto.description;
    newPost.media = createPostDto.media;
    newPost.user = user;
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();
    const ans = await this.postRepo.save(newPost);
    return { id: newPost.id, description: newPost.description, media: newPost.media, createdAt: newPost.createdAt, updatedAt: newPost.updatedAt };
  }

  // Return all posts
  async findAll() {
    return await this.postRepo.find({ 
      relations: ['user'], 
      select: ['id', 'description', 'media', 'createdAt', 'updatedAt', 'user'] 
    });
  }

  // Find a post by id
  async findOne(id: number) {
    // Verify if post exists
    const post = await this.postRepo.findOne(id, { relations: ['user'] });
    if (!post) {
      // If post doesn't exists, throw an error 404 and return
      throw new HttpException(`Post with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }    
    return { id: post.id, description: post.description, media: post.media, createdAt: post.createdAt, updatedAt: post.updatedAt }; 
  }

  // Update a post
  async update(id: number, updatePostDto: UpdatePostDto) {
    // Verify if post to update exists
    const post = await this.postRepo.findOne({ id: id });
    if (!post) {
      // If post doesn't exists, throw an error 404 and return
      throw new HttpException(`Post with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }
    // Update the post
    post.description = updatePostDto.description;
    post.media = updatePostDto.media;  
    post.updatedAt = new Date();
    return await this.postRepo.save(post);
  }

  // Delete a post by id
  async remove(id: number) {
    // Verify if post exists
    const post = await this.postRepo.findOne({ id: id });
    if (!post) {
      // If post doesn't exists, throw an error 404 and return
      throw new HttpException(`Post with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }
    await this.postRepo.delete(id);
    return post; 
  }
}
