import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString() @IsNotEmpty()
    text: string;

    @IsString()
    media: string;

    @IsNumber() @IsNotEmpty()
    postId: number;

    @IsNumber() @IsNotEmpty()
    userId: number;
}
