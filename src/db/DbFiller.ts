import { IDbFiller } from './interfaces/IDbFiller';
import { Connection, FieldInfo, MysqlError } from 'mysql';
import { IUserDao } from './schema/model';
import { IDbConnection } from './interfaces/IDbConnection';
import { Query } from './Query';
import { IQuery } from './interfaces/IQuery';

/**
 * Class responsible for creating and seeding data into DB
 */
export class DbFiller implements IDbFiller {

    private _db: Connection;

    /**
     * Class constructor
     */
    constructor(dbConnection: IDbConnection) {
        dbConnection.connect();
        this._db = dbConnection.getMySqlConnection();
    }

    /**
     * Prepares DB schema if it does not exist
     */
    public prepareDbSchema(): void {
        this.createUserTableIfNotExist();
    }

    /**
     * Seeds data into existing DB and schema
     */
    public async seedDataIntoDb(): Promise<void> {
        let query: IQuery = new Query(this._db);
        let allUsers: IUserDao[] = await query.selectAllUsers();
        console.log(JSON.stringify(allUsers));
    }

    /**
     * Creates User table
     */
    private createUserTableIfNotExist(): void {
        this._db.query(
            "CREATE TABLE IF NOT EXISTS `User`\
            (`id` int NOT NULL COMMENT 'primary key',\
            `name` varchar(255) NOT NULL COMMENT 'user name',\
            `email` varchar(255) NOT NULL COMMENT 'user salary',\
            `accessToken` varchar(255) NOT NULL COMMENT 'user access token',\
            PRIMARY KEY(id));"
        );
    }
}