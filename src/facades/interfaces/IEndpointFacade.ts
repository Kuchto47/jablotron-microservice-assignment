import { MonitoredEndpointPayload } from '../model';

export interface IEndpointFacade {
    insertEndpoint(userAccessToken: string, payload: MonitoredEndpointPayload): Promise<number>;
}