import { type } from 'os';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { PostEntity } from "src/modules/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 50})
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @OneToMany(
        type => PostEntity,
        post => post.user
    )
    posts: PostEntity[];

    @OneToMany(
        type => CommentEntity,
        comment => comment.user
    )
    comments: CommentEntity[];
}
