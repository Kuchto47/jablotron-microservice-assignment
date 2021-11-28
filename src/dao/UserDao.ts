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
            this.db.query("SELECT * from User", (err: MysqlError, results: UserDto[], _: FieldInfo[]) => {
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
        throw new Error('Method not implemented.');
    }
}