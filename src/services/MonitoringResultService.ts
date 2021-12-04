import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultService } from './interfaces/IMonitoringResultService';
import { IMonitoringResultDao } from '../dao/interfaces/IMonitoringResultDao';

export class MonitoringResultService implements IMonitoringResultService {

    /**
     * Class constructor
     */
    constructor(
        private readonly monitoringResultDao: IMonitoringResultDao
    ) {}

    public async insertResult(payload: any): Promise<number> {
        throw new Error('Method not implemented.');
    }

    public async selectLast10ResultsForEndpoint(endpointId: number, userId: number): Promise<MonitoringResultDto[]> {
        throw new Error('Method not implemented.');
    }
}