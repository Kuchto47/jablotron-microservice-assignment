import { MonitoringResultDto } from '../../db/model';

export interface IMonitoringResultService {
    /**
     * Inserts monitoring result into DB
     * 
     * @param payload 
     * 
     * @returns ID of newly inserted monitoring result
     */
    insertResult(payload: any): Promise<number>;

    /**
     * Selects all monitoring results
     * 
     * @param userAccessToken 
     * 
     * @returns List of monitoring results
     */
    selectAllResults(userAccessToken: string): Promise<MonitoringResultDto[]>;
}