import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'nvarchar', nullable: false})
    username: string;

    @Column({type: 'nvarchar', nullable: false})
    firstName: string;

    @Column({type: 'nvarchar', nullable: false})
    lastName: string;

    @Column({type: 'nvarchar', nullable: false})
    email: string;
}