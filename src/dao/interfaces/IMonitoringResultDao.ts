import { MonitoringResultDto } from '../../db/model';

export interface IMonitoringResultDao {
    insertMonitoringResult(monitoringResult: MonitoringResultDto): void;
    selectMonitoringResultsForEndpoint(endpointId: number): Promise<MonitoringResultDto[]>;
}