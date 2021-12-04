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
     * Selects last 10 monitoring results for given endpoint id owned by requesting user
     * 
     * @param endpointId requested endpoint's results
     * 
     * @param userId user to whom endpoints shall belong to
     * 
     * @returns List of up to 10 monitoring results
     */
     selectLast10ResultsForEndpoint(endpointId: number, userId: number): Promise<MonitoringResultDto[]>;
}