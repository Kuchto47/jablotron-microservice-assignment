import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultService } from './interfaces/IMonitoringResultService';

export class MonitoringResultService implements IMonitoringResultService {

    /**
     * Class constructor
     */
    constructor() {}

    public async insertResult(payload: any): Promise<number> {
        throw new Error('Method not implemented.');
    }

    public async selectAllResults(userAccessToken: string): Promise<MonitoringResultDto[]> {
        throw new Error('Method not implemented.');
    }

}