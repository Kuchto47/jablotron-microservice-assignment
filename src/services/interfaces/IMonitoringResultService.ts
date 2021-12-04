import { MonitoringResultDto } from '../../db/model';

export interface IMonitoringResultService {
    /**
     * Inserts monitoring result into DB
     * 
     * @param payload Monitoring Result to be inserted into DB
     * 
     * @returns ID of newly inserted monitoring result
     */
    insertResult(payload: MonitoringResultDto): Promise<number>;

    /**
     * Selects last 10 monitoring results for given endpoint id owned by requesting user
     * 
     * @param endpointId requested endpoint's results
     * 
     * @param userId user to whom endpoints shall belong to
     * 
     * @returns List of up to 10 monitoring results
     * 
     * @throws Exception if endpoint is found but belongs to somebody else or selecting results failed...
     */
     selectLast10ResultsForEndpoint(endpointId: number, userId: number): Promise<MonitoringResultDto[]>;
}