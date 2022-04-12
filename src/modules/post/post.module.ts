import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostEntity } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
