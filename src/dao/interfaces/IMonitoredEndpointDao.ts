import { MonitoredEndpointDto } from '../../db/model';

export interface IMonitoredEndpointDao {
    insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<number>;
    selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]>;
    selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]>;
    deleteEndpoint(id: number): Promise<boolean>;
}