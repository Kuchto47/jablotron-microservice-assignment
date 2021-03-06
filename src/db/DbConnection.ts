import { Connection, createConnection } from "mysql";
import { dbOptions } from "./config";
import { IDbConnection } from './interfaces/IDbConnection';

/**
 * Class responsible for providing connection to MySQL DB.
 */
export class DbConnection implements IDbConnection {

    private _connection: Connection;

    /**
     * Class constructor
     */
    constructor() {
        this._connection = createConnection(dbOptions);
    }

    public connect(): void {
        this._connection.connect((err) => {
            if (err) throw err;
            console.log("Connected to DB...");
        });
    }

    public getMySqlConnection(): Connection {
        return this._connection;
    }
}