import { MonitoredEndpointDto } from '../../db/schema/model';

export interface IMonitoredEndpointDao {
    insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<number>;
    selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]>;
    selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]>;
}