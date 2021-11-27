import { MonitoredEndpointDto } from '../db/schema/model';

export interface IMonitoredEndpointDao {
    insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): void;
    selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]>;
    selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]>;
}