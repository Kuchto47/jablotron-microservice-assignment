import { Connection } from 'mysql';
import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultDao } from './interfaces/IMonitoringResultDao';

/**
 * Class representing Data Access Object for MonitoredEndpoint
 */
export class MonitoringResultDao implements IMonitoringResultDao {

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
        throw new Error('Method not implemented.');
    }

    
}