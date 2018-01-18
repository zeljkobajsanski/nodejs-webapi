import "reflect-metadata";
import {DbProvider, DbSettings} from "./db/db-provider";
import {Server} from "./server/server";


const settings: DbSettings = {
    database: process.env.NODEWEBAPI_DB_NAME || 'TestApi',
    username: process.env.DB_USERNAME || 'developer',
    password: process.env.DB_PASSWORD || 'developer'
}
DbProvider.connect(settings).then(() => {
    const server = new Server();
    server.start('localhost', 3000);
});