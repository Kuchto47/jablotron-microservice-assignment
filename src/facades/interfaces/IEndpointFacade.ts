import { MonitoredEndpointDto } from '../../db/model';
import { MonitoredEndpointPayload } from '../model';

export interface IEndpointFacade {
    insertEndpoint(userAccessToken: string, payload: MonitoredEndpointPayload): Promise<number>;
    selectAllEndpoints(): Promise<MonitoredEndpointDto[]>;
}