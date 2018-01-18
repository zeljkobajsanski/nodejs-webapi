import {Container} from "inversify";
import {UsersService} from "../services/users-service";
import {TYPES} from "./types";
import "../controllers/users"
import {UsersRepository} from "../db/users-repository";
import {getCustomRepository} from "typeorm";


const container = new Container();

container.bind<UsersRepository>(TYPES.UsersRepository).toDynamicValue(() => getCustomRepository(UsersRepository));
container.bind<UsersService>(TYPES.UsersService).to(UsersService);

export {container};