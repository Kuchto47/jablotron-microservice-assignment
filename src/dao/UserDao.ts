import { Connection, MysqlError } from 'mysql';
import { UserDto } from '../db/model';
import { IUserDao } from './interfaces/IUserDao';

/**
 * Class representing Data Access Object for User
 */
export class UserDao implements IUserDao {
    /**
     * UserDao constructor
     */
    constructor(private db: Connection) {}

    public insertUser(user: UserDto): void {
        this.db.query(`INSERT INTO User (name, email, accessToken) VALUES ("${user.name}", "${user.email}", "${user.accessToken}")`);
    }

    public selectAllUsers(): Promise<UserDto[]> {
        return new Promise<UserDto[]>((resolve, reject) => {
            this.db.query("SELECT * FROM User", (err: MysqlError, results: UserDto[]) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    public selectUserWithAccessToken(accessToken: string): Promise<UserDto> {
        return new Promise<UserDto>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM User\
                WHERE accessToken = "${accessToken}"`,
                (err: MysqlError, results: UserDto[]) => {
                    if (err) reject(err);
                    if (results.length === 0) reject("No such user found");
                    if (results.length >= 2) reject("More such users found, indeterminate!");
                    resolve(results[0]);
                }
            );
        });
    }

    public selectUserWithId(id: number): Promise<UserDto> {
        return new Promise<UserDto>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM User\
                WHERE id = "${id}"`,
                (err: MysqlError, results: UserDto[]) => {
                    if (err) reject(err);
                    if (results.length === 0) reject("No such user found");
                    resolve(results[0]);
                }
            );
        });
    }
}