import { MonitoringResultDto } from '../../db/model';

export interface IMonitoringResultFacade {
    insertResult(payload: any): Promise<number>;
    selectAllResults(userAccessToken: string): Promise<MonitoringResultDto[]>;
}