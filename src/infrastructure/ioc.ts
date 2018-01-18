import {Container, ContainerModule} from "inversify";
import {UsersService} from "../services/users-service";
import {TYPES} from "./types";
import "../controllers/users"
import {UsersRepository} from "../db/users-repository";
import {getCustomRepository} from "typeorm";

let repositories = new ContainerModule((bind) => {
    container.bind<UsersRepository>(TYPES.UsersRepository).toDynamicValue(() => getCustomRepository(UsersRepository));
});

let services = new ContainerModule((bind) => {
    container.bind<UsersService>(TYPES.UsersService).to(UsersService);
});

const container = new Container();
container.load(repositories, services);

export {container};