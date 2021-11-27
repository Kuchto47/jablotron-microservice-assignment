import { Connection } from "mysql";

export interface IDbConnection {
    connect(): void;
    getMySqlConnection: () => Connection;
}