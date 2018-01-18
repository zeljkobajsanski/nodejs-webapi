import {DbProvider} from "../../../db/db-provider";
import {getCustomRepository} from "typeorm";
import {UsersRepository} from "../../../db/users-repository";
import {User} from "../../../entities/user";

describe("UsersRepository", () => {

    beforeAll(() => {
        const dbSettings = {database: 'TestApi1', username: 'developer', password: 'developer'};
        return DbProvider.connect(dbSettings);
    });

    it("save", async () => {
        // arrange
        const usersRepository = getCustomRepository(UsersRepository);
        const user = new User();
        user.username = "zeksdev";
        user.firstName = "Zeljko";
        user.lastName = "Bajsanski";
        user.email = "zeljko.bajsanski@gmail.com";

        // act
        const savedUser = await usersRepository.save(user);

        // assert
        expect(savedUser.id).not.toBe(0);
    });

    it("getUsers", async () => {
        const usersRepository = getCustomRepository(UsersRepository);

        // act
        const users = await usersRepository.getUsers();

        // assert
        expect(users.length).toBe(1);
    });

    afterAll(() => {
        const usersRepository = getCustomRepository(UsersRepository);
        return usersRepository.clear();
    });
});