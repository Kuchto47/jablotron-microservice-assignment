import { MonitoredEndpointDto } from '../../db/model';

export interface IMonitoredEndpointDao {
    /**
     * Inserts given Endpoint into DB.
     * 
     * @param endpoint Endpoint to insert
     * 
     * @returns ID of inserted record
     */
    insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<number>;

    /**
     * Retrieves specific monitored endpoint
     * 
     * @param endpointId ID of endpoint to retrieve
     * 
     * @returns Monitored Endpoint
     */
    selectMonitoredEndpointById(endpointId: number): Promise<MonitoredEndpointDto>;

    /**
     * Select all Endpoints
     * 
     * @returns all monitored endpoints from DB
     */
     selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]>;

    /**
     * Select all Endpoints for owner with given ID
     * 
     * @param ownerId ID of owner of requested endpoints
     * 
     * @returns all monitored endpoints from DB for given user
     */
    selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]>;

    /**
     * Retrieves Monitored Endpoint with given ID belonging to given user
     * 
     * @param endpointId endpoint to retrieve
     * 
     * @param ownerId id of accepted owner
     * 
     * @returns Monitored Endpoint if criteria are fulfilled
     */
    selectMonitoredEndpointWithIdForUser(endpointId: number, ownerId: number): Promise<MonitoredEndpointDto>;

    /**
     * Updates Monitored Endpoint
     * 
     * @param endpoint endpoint to update
     * 
     * @returns true if successful, otherwise false
     */
    updateMonitoredEndpoint(endpoint: MonitoredEndpointDto): Promise<boolean>

    /**
     * Updates Monitored Endpoint's lastCheckDate
     * 
     * @param date new date to be set
     * 
     * @param id Id of endpoint to update
     * 
     * @returns true if successful, otherwise false
     */
     updateMonitoredEndpointsLastCheckDate(date: string, id: number): Promise<boolean>

    /**
     * Deletes endpoint from DB
     * 
     * @param id endpoint id to be deleted
     * 
     * @returns true if correctly deleted, false otherwise
     */
    deleteEndpoint(id: number): Promise<boolean>;
}