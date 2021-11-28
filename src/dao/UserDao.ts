import { Connection, FieldInfo, MysqlError } from 'mysql';
import { UserDto } from '../db/schema/model';
import { IUserDao } from './interfaces/IUserDao';

/**
 * Class representing Data Access Object for User
 */
export class UserDao implements IUserDao {
    /**
     * UserDao constructor
     */
    constructor(private db: Connection) {}

    /**
     * Inserts given user into DB.
     * @param user User to insert
     */
    public insertUser(user: UserDto): void {
        this.db.query(`INSERT INTO User (name, email, accessToken) VALUES ("${user.name}", "${user.email}", "${user.accessToken}")`);
    }

    /**
     * Selects all users from DB
     * @returns all users in DB
     */
    public selectAllUsers(): Promise<UserDto[]> {
        return new Promise<UserDto[]>((resolve, reject) => {
            this.db.query("SELECT * FROM User", (err: MysqlError, results: UserDto[]) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    /**
     * Get user with given access token
     * @param accessToken to look for in DB
     */
    public selectUserWithAccessToken(accessToken: string): Promise<UserDto> {
        return new Promise<UserDto>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM User\
                WHERE accessToken = ${accessToken}`,
                (err: MysqlError, results: UserDto[]) => {
                    if (err) reject(err);
                    if (results.length === 0) reject("No such user found");
                    if (results.length >= 2) reject("More such users found");
                    resolve(results[0]);
                }
            );
        });
    }
}