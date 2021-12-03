import { MonitoringResultDto } from '../../db/model';

export interface IMonitoringResultDao {
    /**
     * Inserts new monitoring result into DB
     * 
     * @param monitoringResult 
     */
    insertMonitoringResult(monitoringResult: MonitoringResultDto): void;

    /**
     * Retrieves last 10 monitoring results for given endpoint
     * 
     * @param endpointId ID of endpoint for which results are wanted
     * 
     * @returns List of up to 10 monitoring results
     */
    selectLast10MonitoringResultsForEndpoint(endpointId: number): Promise<MonitoringResultDto[]>;
}