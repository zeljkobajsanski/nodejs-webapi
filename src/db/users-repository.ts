import {EntityRepository, Repository} from "typeorm";
import {User} from "../entities/user";
import {injectable} from "inversify";

// @injectable()
@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    getUsers() {
        return this.find();
    }
}