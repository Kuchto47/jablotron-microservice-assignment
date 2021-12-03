import { Connection } from "mysql";

export interface IDbConnection {
    /**
     * Connects to defined DB.
     */
    connect(): void;

    /**
     * Provides connection to existing MySQL DB
     * 
     * @returns Connection to existing MySQL DB
     */
    getMySqlConnection: () => Connection;
}