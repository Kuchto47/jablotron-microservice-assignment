import { IMonitoredEndpointDao } from '../dao/interfaces/IMonitoredEndpointDao';
import { IUserDao } from '../dao/interfaces/IUserDao';
import { UserDto, MonitoredEndpointDto } from '../db/model';
import { MonitoredEndpointPayload } from './model';
import { IEndpointFacade } from './interfaces/IEndpointFacade';
import { convertDateToDbFriendlyFormat } from '../helpers';

export class EndpointFacade implements IEndpointFacade {
    /**
     * Class constructor
     */
    constructor(private readonly endpointDao: IMonitoredEndpointDao) {}

    /**
     * Selects all Monitored Endpoints for User with given access token
     */
    public async selectAllEndpoints(userId: number): Promise<MonitoredEndpointDto[]> {
        return await this.endpointDao.selectMonitoredEndpointsForUser(userId);
    }

    /**
     * Inserts given endpoint into DB
     */
    public async insertEndpoint(userId: number, payload: MonitoredEndpointPayload): Promise<number> {
        let monitoredEndpoint: MonitoredEndpointDto = {
            name: payload.name,
            url: payload.url,
            creationDate: convertDateToDbFriendlyFormat(new Date()),
            monitoredInterval: payload.monitoredInterval,
            ownerId: userId
        };
        return await this.endpointDao.insertMonitoredEndpoint(monitoredEndpoint);
    }

    /**
     * 
     * @param data 
     */
    public async updateEndpoint(data: any, endpointId: number): Promise<number> {
        throw new Error('Method not implemented.');
    }

    /**
     * Deletes MonitoredEndpoint from DB
     * @param endpointId endpoint to be deleted
     * @param userId user who is deleting
     * @returns true if deleted, false otherwise
     */
    public async deleteEndpoint(endpointId: number, userId: number): Promise<boolean> {
        try {
            let ownedEndpoints = await this.endpointDao.selectMonitoredEndpointsForUser(userId);
            if (!ownedEndpoints.find(x => x.id === endpointId)) return false;
            return await this.endpointDao.deleteEndpoint(endpointId);
        } catch (_) {
            return false;
        }
    }
}