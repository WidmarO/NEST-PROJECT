import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString() @IsOptional()
    name: string;

    @IsString() @IsOptional()
    surname: string;

    @IsString() @IsEmail() @IsOptional()
    email: string;

    @IsString() @MinLength(6) @IsOptional()
    password: string;

    @IsString() @IsOptional()
    address: string;
}
