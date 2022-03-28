import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString() @IsNotEmpty()
    name: string;

    @IsString() @IsNotEmpty()
    surname: string;

    @IsString() @IsEmail() @IsNotEmpty()
    email: string;

    @IsString() @MinLength(6) @IsNotEmpty()
    password: string;

    @IsString()
    address: string;
}
