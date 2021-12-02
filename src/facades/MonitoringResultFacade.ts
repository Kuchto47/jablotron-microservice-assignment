import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultFacade } from './interfaces/IMonitoringResultFacade';

export class MonitoringResultFacade implements IMonitoringResultFacade {

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * 
     * @param payload 
     */
    public async insertResult(payload: any): Promise<number> {
        throw new Error('Method not implemented.');
    }

    /**
     * 
     * @param userAccessToken 
     */
    public async selectAllResults(userAccessToken: string): Promise<MonitoringResultDto[]> {
        throw new Error('Method not implemented.');
    }

}