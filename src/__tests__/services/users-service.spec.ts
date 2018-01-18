import "reflect-metadata";
import {UsersRepository} from "../../db/users-repository";
import {UsersService} from "../../services/users-service";
import {User} from "../../entities/user";

describe("UsersService", () => {
    const repository = new UsersRepository();

    it("getAllUsers", () => {
        // arrange
        const expected = [
            new User(),
            new User()
        ];
        repository.getUsers = jest.fn(() => expected);
        const usersService = new UsersService(repository);

        // act
        const actual = usersService.getAllUsers();

        // assert
        expect(actual).toBe(expected);
    });

    it("saveUser", () => {
        // arrange
        const service = new UsersService(repository);
        const expected = new User();
        const mockSave = jest.fn((user: User) => user);
        repository.save = mockSave;

        // act
        const actual = service.saveUser(expected);

        // assert
        expect(actual).toBe(expected);
    });

    it("deleteUserById", async () => {
       // arrange
        const service = new UsersService(repository);
        let actual = 0;
        repository.deleteById = jest.fn((userId: number) => actual = userId);

        // act
        await service.deleteUserById(50);

        // assert
        expect(actual).toBe(50);
    });
});