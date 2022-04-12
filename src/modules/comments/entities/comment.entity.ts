import { PostEntity } from "src/modules/post/entities/post.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    media: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(
        type => PostEntity,
        post => post.comments
    ) 
    post: PostEntity;

    @ManyToOne(
        type => UserEntity,
        user => user.comments
    ) 
    user: UserEntity;
}
