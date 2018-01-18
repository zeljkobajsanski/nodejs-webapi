import {inject, injectable} from "inversify";
import {TYPES} from "../infrastructure/types";
import {UsersRepository} from "../db/users-repository";
import {User} from "../entities/user";

@injectable()
export class UsersService {
    constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepository) {}

    getAllUsers() {
        return this.usersRepository.getUsers();
    }

    saveUser(user: User) {
        return this.usersRepository.save(user);
    }

    deleteUserById(userId: number) {
        return this.usersRepository.deleteById(userId);
    }
}