import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultFacade } from './interfaces/IMonitoringResultFacade';

export class MonitoringResultFacade implements IMonitoringResultFacade {

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