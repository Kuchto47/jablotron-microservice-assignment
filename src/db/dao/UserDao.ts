import { Connection, FieldInfo, MysqlError } from 'mysql';
import { UserDto } from '../schema/model';
import { IUserDao } from './IUserDao';

export class UserDao implements IUserDao {
    /**
     * UserDao constructor
     */
    constructor(private db: Connection) {
    }

    /**
     * Inserts given user into DB.
     * @param user User to insert
     */
    insertUser(user: UserDto): void {
        this.db.query(`INSERT INTO User (name, email, accessToken) VALUES ("${user.name}", "${user.email}", "${user.accessToken}")`);
    }

    /**
     * Selects all users from DB
     * @returns all users in DB
     */
    selectAllUsers(): Promise<UserDto[]> {
        return new Promise<UserDto[]>((resolve, reject) => {
            this.db.query("SELECT * from User", (err: MysqlError, results: UserDto[], _: FieldInfo[]) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }


}