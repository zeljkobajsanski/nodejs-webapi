import {InversifyExpressServer} from "inversify-express-utils";
import * as bodyparser from 'body-parser';
import {container} from '../infrastructure/ioc';
import {Application} from "express";


export class Server {
    server: InversifyExpressServer;
    app: Application;


    constructor() {
        this.server = new InversifyExpressServer(container);
        this.server.setConfig(app => {
            app.use(bodyparser.json());
        });
        this.app = this.server.build();
    }

    start(host: string = 'localhost', port: number = 3000) {
        this.app.listen(port, host, () => console.log("Server is up and running"));
    }
}