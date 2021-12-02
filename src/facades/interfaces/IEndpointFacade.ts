import { MonitoredEndpointDto } from '../../db/model';
import { MonitoredEndpointPayload } from '../model';

export interface IEndpointFacade {
    insertEndpoint(userAccessToken: string, payload: MonitoredEndpointPayload): Promise<number>;
    selectAllEndpoints(userAccessToken: string): Promise<MonitoredEndpointDto[]>;
    updateEndpoint(data: any): Promise<void>;
    deleteEndpoint(id: number): Promise<void>;
}