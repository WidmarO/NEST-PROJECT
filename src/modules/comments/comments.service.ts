import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from '../user/entities/user.entity';
import { PostEntity } from '../post/entities/post.entity';


@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(CommentEntity)
      private commentRepo: Repository<CommentEntity>,
    @InjectRepository(UserEntity) 
      private userRepo: Repository<UserEntity>,
    @InjectRepository(PostEntity) 
      private postRepo: Repository<PostEntity>
  ) {}

  // Return all comments
  async findAll() {
    return await this.commentRepo.find({ 
      relations: ['user', 'post']
    });
  }

  // Create a new comment
  async create(createCommentDto: CreateCommentDto) {
    // Verify if user and the post with the corresponding id's exists
    const user = await this.userRepo.findOne({ id: createCommentDto.userId });
    const post = await this.postRepo.findOne({ id: createCommentDto.postId });
    if (!user || !post) {
      throw new HttpException(`User or post with id '${createCommentDto.userId}' or '${createCommentDto.postId}' not found`, HttpStatus.NOT_FOUND);
    }
    // Creating the new comment
    const newComment = new CommentEntity();
    newComment.text = createCommentDto.text;
    newComment.media = createCommentDto.media;
    newComment.user = user;
    newComment.post = post;
    newComment.createdAt = new Date();
    newComment.updatedAt = new Date();
    return await this.commentRepo.save(newComment);
  }

  // Find a comment by id
  async findOne(id: number) {
    // Verify if comment exists
    const comment = await this.commentRepo.findOne(id, {relations: ['user', 'post'] });
    if (!comment) {
      // If comment doesn't exists, throw an error 404 and return
      throw new HttpException(`Comment with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }
    return comment;
  }

  // Update a comment by id
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    // Verify if comment to update exists
    const comment = await this.commentRepo.findOne({ id: id });
    if (!comment) {
      // If comment doesn't exists, throw an error 404 and return
      throw new HttpException(`Comment with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }
    // Update the comment
    comment.text = updateCommentDto.text;
    comment.media = updateCommentDto.media;
    comment.updatedAt = new Date();
    return await this.commentRepo.save(comment);
  }

  // Delete a comment by id
  async remove(id: number) {
    // Verify if comment to delete exists
    const comment = await this.commentRepo.findOne({ id: id });
    if (!comment) {
      // If comment doesn't exists, throw an error 404 and return
      throw new HttpException(`Comment with id '${id}' not found`, HttpStatus.NOT_FOUND);
    }
    // Delete the comment
    await this.commentRepo.delete(id);
    return comment;
  }
}
