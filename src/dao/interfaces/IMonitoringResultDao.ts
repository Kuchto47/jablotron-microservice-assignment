import { MonitoringResultDto } from '../../db/schema/model';

export interface IMonitoringResultDao {
    insertMonitoringResult(result: MonitoringResultDto): void;
    selectAllMonitoringResults(): Promise<MonitoringResultDto[]>;
    selectMonitoringResultsForEndpoint(endpointId: number): Promise<MonitoringResultDto[]>;
}