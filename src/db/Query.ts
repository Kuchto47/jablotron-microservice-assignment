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

    public selectAllUsers() {
        this._db.query("SELECT * from User", (err: MysqlError, results: IUserDao[], fields: FieldInfo[]) => {
            if (err) throw err;
            console.log(`The response is ${JSON.stringify(results)}`);
        });
    }
}