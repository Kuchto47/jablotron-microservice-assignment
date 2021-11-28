import { Connection, MysqlError } from 'mysql';
import { MonitoredEndpointDto } from '../db/schema/model';
import { IMonitoredEndpointDao } from './interfaces/IMonitoredEndpointDao';

/**
 * Class representing Data Access Object for MonitoredEndpoint
 */
export class EndpointDao implements IMonitoredEndpointDao {

    /**
     * EndpointDao constructor
     */
    constructor(private db: Connection) {}

    /**
     * Inserts given Endpoint into DB.
     * @param endpoint Endpoint to insert
     */
    public insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.query(
                `INSERT INTO MonitoredEndpoint\
                (name, url, creationDate, lastCheckDate, monitoredInterval, ownerId)\
                VALUES ("${endpoint.name}", "${endpoint.url}", "${endpoint.creationDate}", "${endpoint.lastCheckDate}", "${endpoint.monitoredInterval}", "${endpoint.ownerId}")`,
                (err: MysqlError, results: any) => {
                    if (err) reject(err);
                    console.log(results);
                    resolve(results);
                }
            );
        });
        
    }

    /**
     * Selects All Endpoints from DB.
     * @returns all monitored endpoints from DB
     */
     public selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]> {
        return new Promise<MonitoredEndpointDto[]>((resolve, reject) => {
            this.db.query("SELECT * FROM MonitoredEndpoint", (err: MysqlError, results: MonitoredEndpointDto[]) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    /**
     * Select all Endpoints for owner with given ID
     * @param ownerId ID of owner of requested endpoints
     */
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

}