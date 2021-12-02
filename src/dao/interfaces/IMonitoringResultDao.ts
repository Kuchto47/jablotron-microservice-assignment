import { MonitoringResultDto } from '../../db/model';

export interface IMonitoringResultDao {
    insertMonitoringResult(monitoringResult: MonitoringResultDto): void;
    selectLast10MonitoringResultsForEndpoint(endpointId: number): Promise<MonitoringResultDto[]>;
}