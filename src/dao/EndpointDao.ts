import { Connection, MysqlError } from 'mysql';
import { MonitoredEndpointDto } from '../db/model';
import { IMonitoredEndpointDao } from './interfaces/IMonitoredEndpointDao';

/**
 * Class representing Data Access Object for MonitoredEndpoint
 */
export class EndpointDao implements IMonitoredEndpointDao {

    /**
     * EndpointDao constructor
     * @param db DB Connection
     */
    constructor(private db: Connection) {}

    public insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.query(
                `INSERT INTO MonitoredEndpoint\
                (name, url, creationDate, monitoredInterval, ownerId)\
                VALUES ("${endpoint.name}", "${endpoint.url}", "${endpoint.creationDate}", "${endpoint.monitoredInterval}", "${endpoint.ownerId}")`,
                (err: MysqlError, results: any) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
        
    }

    public selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]> {
        return new Promise<MonitoredEndpointDto[]>((resolve, reject) => {
            this.db.query("SELECT * FROM MonitoredEndpoint", (err: MysqlError, results: MonitoredEndpointDto[]) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    public selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]> {
        return new Promise<MonitoredEndpointDto[]>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM MonitoredEndpoint\
                WHERE ownerId = ${ownerId}`,
                (err: MysqlError, results: MonitoredEndpointDto[]) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    public async deleteEndpoint(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.db.query(
                `DELETE FROM MonitoredEndpoint WHERE id = ${id}`,
                (err: MysqlError, _: any) => {
                    resolve(!err);
                }
            )
        });
    }
}