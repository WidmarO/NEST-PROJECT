import { Column, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
