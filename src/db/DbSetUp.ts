import { IDbSetUp } from './interfaces/IDbSetUp';
import { Connection } from 'mysql';
import { UserDto } from './model';
import { IDbConnection } from './interfaces/IDbConnection';
import { IUserDao } from '../dao/interfaces/IUserDao';
import { UserDao } from '../dao/UserDao';

/**
 * Class responsible for creating and seeding data into DB
 */
export class DbSetUp implements IDbSetUp {

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
    public prepareDbSchema(): IDbSetUp {
        this.createUserTableIfNotExist();
        this.createMonitoredEndpointTableIfNotExist();
        this.createMonitoringResultTableIfNotExist();
        return this;
    }

    /**
     * Seeds data into existing DB and schema
     */
    public async seedDataIntoDb(): Promise<void> {
        let userDao: IUserDao = new UserDao(this._db);
        let allUsers: UserDto[] = await userDao.selectAllUsers();
        if (allUsers.length === 0) {
            const user1: UserDto = {
                name: "Jablotron",
                email: "info@jablotron.cz",
                accessToken: "93f39e2f-80de-4033-99ee-249d92736a25"
            };
            const user2: UserDto = {
                name: "Batman",
                email: "batman@example.com",
                accessToken: "dcb20f8a-5657-4f1b-9f7f-ce65739b359e"
            };

            userDao.insertUser(user1);
            userDao.insertUser(user2);
        }
    }

    public then(): IDbSetUp {
        return this;
    }

    /**
     * Creates User table
     */
    private createUserTableIfNotExist(): void {
        this._db.query(
            "CREATE TABLE IF NOT EXISTS `User`\
            (`id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',\
            `name` varchar(255) NOT NULL COMMENT 'user name',\
            `email` varchar(255) NOT NULL COMMENT 'user salary',\
            `accessToken` varchar(255) NOT NULL COMMENT 'user access token',\
            PRIMARY KEY(id));"
        );
    }

    /**
     * Creates MonitoredEndpoint table
     */
     private createMonitoredEndpointTableIfNotExist(): void {
        this._db.query(
            "CREATE TABLE IF NOT EXISTS `MonitoredEndpoint`\
            (`id` int NOT NULL auto_increment comment 'primary key',\
            `name` varchar(255) NOT NULL COMMENT 'endpoint name',\
            `url` varchar(255) NOT NULL COMMENT 'endpoint url',\
            `creationDate` DateTime NOT NULL COMMENT 'endpoint creation date',\
            `lastCheckDate` DateTime COMMENT 'endpoint last check date',\
            `monitoredInterval` int NOT NULL COMMENT 'endpoint monitored interval',\
            `ownerId` int NOT NULL COMMENT 'owner of monitored endpoint',\
            primary key(id),\
            CONSTRAINT fk_owner FOREIGN KEY (ownerId)\
            REFERENCES User(id)\
            ON DELETE CASCADE\
            ON UPDATE CASCADE);"
        );
    }

    /**
     * Creates MonitoredEndpoint table
     */
     private createMonitoringResultTableIfNotExist(): void {
        this._db.query(
            "CREATE TABLE IF NOT EXISTS `MonitoringResult`\
            (`id` int NOT NULL auto_increment comment 'primary key',\
            `checkDate` DateTime NOT NULL COMMENT 'date of check',\
            `responseCode` int NOT NULL COMMENT 'http response code',\
            `payloadReturned` varchar(1000) NOT NULL COMMENT 'http response payload',\
            `monitoredEndpointId` int NOT NULL COMMENT 'endpoint ID of monitoring result',\
            primary key(id),\
            CONSTRAINT fk_endpoint FOREIGN KEY (monitoredEndpointId)\
            REFERENCES MonitoredEndpoint(id)\
            ON DELETE CASCADE\
            ON UPDATE CASCADE);"
        );
    }
}