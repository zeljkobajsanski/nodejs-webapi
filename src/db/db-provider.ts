import {createConnection} from "typeorm";
import {User} from "../entities/user";

export interface DbSettings {
    host?: string;
    port?: number;
    database: string;
    username: string;
    password: string;
}

export class DbProvider {
    private static connection;

    static async connect(settings: DbSettings) {
        if (!DbProvider.connection) {
            const {host, port, database, username, password} = settings;
            DbProvider.connection = await createConnection({
                type: 'mssql',
                host: host || 'localhost',
                port: port || 1433,
                database,
                username,
                password,
                entities: [User],
                synchronize: true
            });
        }
        return DbProvider.connection;
    }
}