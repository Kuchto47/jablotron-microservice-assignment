import { Connection, FieldInfo, MysqlError } from 'mysql';
import { IUserDao } from './schema/model';
import { IQuery } from './interfaces/IQuery';

export class Query implements IQuery {

    private _db: Connection;

    /**
     * Constructor
     */
    constructor(db: Connection) {
        this._db = db;
    }

    public selectAllUsers(): Promise<IUserDao[]> {
        return new Promise<IUserDao[]>((resolve, reject) => {
            this._db.query("SELECT * from User", (err: MysqlError, results: IUserDao[], _: FieldInfo[]) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}