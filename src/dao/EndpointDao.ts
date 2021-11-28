import { Connection } from 'mysql';
import { MonitoredEndpointDto } from '../db/schema/model';
import { IMonitoredEndpointDao } from './interfaces/IMonitoredEndpointDao';

export class EndpointDao implements IMonitoredEndpointDao {

    /**
     * EndpointDao constructor
     */
    constructor(private db: Connection) {}

    /**
     * Inserts given Endpoint into DB.
     * @param endpoint Endpoint to insert
     */
    insertMonitoredEndpoint(endpoint: MonitoredEndpointDto): void {
        throw new Error('Method not implemented.');
    }

    /**
     * Selects All Endpoints from DB.
     * @returns all monitored endpoints from DB
     */
    selectAllMonitoredEndpoints(): Promise<MonitoredEndpointDto[]> {
        throw new Error('Method not implemented.');
    }

    /**
     * Select all Endpoints for owner with given ID
     * @param ownerId ID of owner of requested endpoints
     */
    selectMonitoredEndpointsForUser(ownerId: number): Promise<MonitoredEndpointDto[]> {
        throw new Error('Method not implemented.');
    }

}