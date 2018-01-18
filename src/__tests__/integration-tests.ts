import "reflect-metadata";
import {DbProvider, DbSettings} from "../db/db-provider";
import {Server} from "../server/server";
import request = require("supertest");
import {User} from "../entities/user";
import {UsersRepository} from "../db/users-repository";

describe("Integration tests", () => {
    let server: Server = null;
    let httpServer;
   beforeAll(async () => {
       const settings: DbSettings = {
           database: 'TestApi1',
           username: process.env.DB_USERNAME || 'developer',
           password: process.env.DB_PASSWORD || 'developer'
       };

       await DbProvider.connect(settings);
       server = new Server()
       httpServer = server.start();
   });

   it("get all users should return 0", () =>  {
        return request(httpServer).get("/users")
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.length).toBe(0);
            });
   });

   it("add user", () => {
       let user = {username: 'zeksdev', firstName: 'Zeljko', lastName: 'Bajsanski', email: 'zeljko.bajsanski@gmail.com'};
       return request(httpServer).post("/users").send(user).expect(200).then(res => {
           let savedUser: User = <User>res.body;
           expect(savedUser).toBeDefined();
           expect(savedUser.id).toBeGreaterThan(0);
           expect(savedUser.username).toBe(user.username);
           expect(savedUser.firstName).toBe(user.firstName);
           expect(savedUser.lastName).toBe(user.lastName);
           expect(savedUser.email).toBe(user.email);
       });
   });

   it("get all users should return users", () => {
       return request(httpServer).get("/users")
           .expect(200)
           .then(res => {
               expect(res.body).toBeDefined();
               expect(res.body.length).toBe(1);
           });
   });

   afterAll(async () => {
       const connection = await DbProvider.getConnection();
       await connection.getCustomRepository(UsersRepository).clear();
       server.stop();
   });
});