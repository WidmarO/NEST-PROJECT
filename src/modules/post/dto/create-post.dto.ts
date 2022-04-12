import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";

export class CreatePostDto {
    @IsString() @IsNotEmpty()
    description: string;

    @IsString()
    media: string;

    @IsNumber() @IsNotEmpty()
    userId: number;
}
