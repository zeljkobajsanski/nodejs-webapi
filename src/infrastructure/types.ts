import {UsersService} from "../services/users-service";
import {UsersRepository} from "../db/users-repository";

export const TYPES = {
    UsersRepository: Symbol.for("UsersRepository"),
    UsersService: Symbol.for("UsersService")
}