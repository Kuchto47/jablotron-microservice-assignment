import { Connection, MysqlError } from 'mysql';
import { MonitoredEndpointDto } from '../db/model';
import { IMonitoredEndpointDao } from './interfaces/IMonitoredEndpointDao';

/**
 * Class representing Data Access Object for MonitoredEndpoint
 */
export class MonitoredEndpointDao implements IMonitoredEndpointDao {

    private readonly TABLE_NAME: string = "MonitoredEndpoint";

    /**
     * EndpointDao constructor
     * @param db DB Connection
     */
    constructor(private db: Connection) {}

    public insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.query(
                `INSERT INTO ${this.TABLE_NAME}\
                (name, url, creationDate, monitoredInterval, ownerId)\
                VALUES ("${endpoint.name}", "${endpoint.url}", "${endpoint.creationDate}", "${endpoint.monitoredInterval}", "${endpoint.ownerId}")`,
                (err: MysqlError, results: any) => {
                    if (err) reject(err);
                    else resolve(results.insertId);
                }
            );
        });
    }

    public selectMonitoredEndpointById(endpointId: number): Promise<MonitoredEndpointDto> {
        return new Promise<MonitoredEndpointDto>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM ${this.TABLE_NAME}\
                WHERE id = ${endpointId}`,
                (err: MysqlError, results: MonitoredEndpointDto[]) => {
                    if (err) reject(err);
                    else if (results.length !== 1) reject();
                    else resolve(results[0]);
                }
            );
        });
    }

    public selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]> {
        return new Promise<MonitoredEndpointDto[]>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM ${this.TABLE_NAME}`,
                (err: MysqlError, results: MonitoredEndpointDto[]) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }

    public selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]> {
        return new Promise<MonitoredEndpointDto[]>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM ${this.TABLE_NAME}\
                WHERE ownerId = ${ownerId}`,
                (err: MysqlError, results: MonitoredEndpointDto[]) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }

    public selectMonitoredEndpointWithIdForUser(endpointId: number, ownerId: number): Promise<MonitoredEndpointDto> {
        return new Promise<MonitoredEndpointDto>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM ${this.TABLE_NAME}\
                WHERE id = ${endpointId} AND\
                ownerId = ${ownerId}`,
                (err: MysqlError, results: MonitoredEndpointDto[]) => {
                    if (err) reject(err);
                    else if (results.length !== 1) reject();
                    else resolve(results[0]);
                }
            );
        });
    }

    public updateMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.db.query(
                `UPDATE ${this.TABLE_NAME}\
                SET name = '${endpoint.name}',\
                url = '${endpoint.url}',\
                monitoredInterval = ${endpoint.monitoredInterval}\
                WHERE id = ${endpoint.id}`,
                (err: MysqlError, _: any) => {
                    resolve(!err);
                }
            )
        });
    }

    public deleteEndpoint(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.db.query(
                `DELETE FROM ${this.TABLE_NAME} WHERE id = ${id}`,
                (err: MysqlError, _: any) => {
                    resolve(!err);
                }
            )
        });
    }
}