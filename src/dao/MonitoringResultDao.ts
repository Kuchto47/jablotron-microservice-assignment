import { Connection, MysqlError } from 'mysql';
import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultDao } from './interfaces/IMonitoringResultDao';

/**
 * Class representing Data Access Object for MonitoredEndpoint
 */
export class MonitoringResultDao implements IMonitoringResultDao {

    private readonly TABLE_NAME: string = "MonitoringResult";

    /**
     * EndpointDao constructor
     * 
     * @param db DB connection
     */
    constructor(private db: Connection) {}

    public async insertMonitoringResult(monitoringResult: MonitoringResultDto): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async selectLast10MonitoringResultsForEndpoint(endpointId: number): Promise<MonitoringResultDto[]> {
        return new Promise<MonitoringResultDto[]>((resolve, reject) => {
            this.db.query(
                `SELECT * FROM ${this.TABLE_NAME}\
                WHERE monitoredEndpointId = ${endpointId}\
                ORDER BY checkDate DESC\
                LIMIT 10`,
                (err: MysqlError, results: MonitoringResultDto[]) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }

    
}