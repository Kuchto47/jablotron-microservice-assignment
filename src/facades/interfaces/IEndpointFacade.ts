import { MonitoredEndpointDto } from '../../db/model';
import { MonitoredEndpointPayload } from '../model';

export interface IEndpointFacade {
    /**
     * Inserts sent payload into DB
     * @param userAccessToken token of user
     * @param payload payload to insert
     */
    insertEndpoint(userAccessToken: string, payload: MonitoredEndpointPayload): Promise<number>;

    /**
     * Retrieves all endpoints for user
     * @param userAccessToken user requesting all endpoints
     */
    selectAllEndpoints(userId: number): Promise<MonitoredEndpointDto[]>;

    /**
     * Updates endpoint with new data
     * @param data data to persist
     * @param endpointId endpoint which should be updated
     */
    updateEndpoint(data: any, endpointId: number): Promise<number>;

    /**
     * Deletes MonitoredEndpoint from DB
     * @param id endpoint to be deleted
     */
    deleteEndpoint(id: number): Promise<void>;
}