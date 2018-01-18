import Controller = interfaces.Controller;
import {controller, httpDelete, httpGet, httpPost, interfaces, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../infrastructure/types";
import {UsersService} from "../services/users-service";
import * as express from "express";

@controller("/users")
export class UsersController implements Controller {

    constructor(@inject(TYPES.UsersService) private usersService: UsersService) {}

    @httpGet("/")
    public getUsers() {
        return this.usersService.getAllUsers();
    }

    @httpPost("/")
    public async saveUser(req: express.Request, res: express.Response) {
        try {
            const user = req.body;
            const saved = await this.usersService.saveUser(user);
            res.send(saved);
        } catch(err) {
            res.sendStatus(400).json({error: err.message});
        }
    }

    @httpDelete(":id")
    public async deleteUser(@requestParam("id") userId: number, @response() res: express.Response) {
        try {
            await this.usersService.deleteUserById(userId);
            res.sendStatus(204);
        } catch(err) {
            res.sendStatus(400).json({error: err.message});
        }
    }
}