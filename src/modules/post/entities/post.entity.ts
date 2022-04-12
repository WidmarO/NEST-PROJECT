import { CommentEntity } from "src/modules/comments/entities/comment.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    description: string;

    @Column()
    media: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(
        type => UserEntity,
        user => user.posts
    ) 
    user: UserEntity;

    @OneToMany(
        type => CommentEntity,
        comment => comment.post
    )
    comments: CommentEntity[];
  // post: Promise<UserEntity>;
}
