import { MonitoredEndpointDto } from '../../db/model';
import { MonitoredEndpointPayload } from '../model';

export interface IMonitoredEndpointService {
    /**
     * Inserts sent payload into DB
     * 
     * @param userId Id of user
     * 
     * @param payload payload to insert
     * 
     * @returns Id of newly inserted document
     */
    insertEndpoint(userId: number, payload: MonitoredEndpointPayload): Promise<number>;

    /**
     * Retrieves all endpoints for user
     * 
     * @param userId Id of user requesting all endpoints
     * 
     * @returns List of Monitored Endpoints for given user
     */
    selectAllEndpointsForUser(userId: number): Promise<MonitoredEndpointDto[]>;

    /**
     * Retrieves all endpoints in DB
     * 
     * @returns List of Monitored Endpoints
     */
    selectAllEndpoints(): Promise<MonitoredEndpointDto[]>;

    /**
     * Retrieves endpoint by Id
     * 
     * @returns Monitored Endpoints
     */
     selectEndpointById(id: number): Promise<MonitoredEndpointDto>;

    /**
     * Updates endpoint with new data
     * 
     * @param data data to persist
     * 
     * @param endpointId endpoint which should be updated
     * 
     * @param userId ID of requester
     * 
     * @returns true if correctly updated, false otherwise
     */
    updateEndpoint(data: MonitoredEndpointPayload, endpointId: number, userId: number): Promise<boolean>;

    /**
     * Updates endpoint with new data
     * 
     * @param date new last checked date
     * 
     * @param endpointId endpoint which should be updated
     * 
     * @returns true if correctly updated, false otherwise
     */
     updateEndpointsLastCheckDate(date: string, endpointId: number): Promise<boolean>;

    /**
     * Deletes MonitoredEndpoint from DB
     * 
     * @param endpointId endpoint to be deleted
     * 
     * @param userId user who is deleting
     * 
     * @returns true if correctly deleted, false otherwise
     */
    deleteEndpoint(endpointId: number, userId: number): Promise<boolean>;
}