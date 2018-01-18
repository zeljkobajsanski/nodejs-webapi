import {InversifyExpressServer} from "inversify-express-utils";
import * as bodyparser from 'body-parser';
import {container} from '../infrastructure/ioc';
import {Application} from "express";
import * as http from "http";


export class Server {
    app: Application;
    httpServer: http.Server;


    constructor() {
        const server = new InversifyExpressServer(container);
        server.setConfig(app => {
            app.use(bodyparser.json());
        });
        this.app = server.build();
    }

    start(host: string = 'localhost', port: number = 3000) {
        this.httpServer = this.app.listen(port, host, () => console.log("Server is up and running."));
        return this.httpServer;
    }

    stop() {
        this.httpServer.close(() => 'Server is shutdown');
    }
}