import { IMonitoredEndpointDao } from '../dao/interfaces/IMonitoredEndpointDao';
import { MonitoredEndpointDto } from '../db/model';
import { MonitoredEndpointPayload } from './model';
import { IEndpointFacade } from './interfaces/IEndpointFacade';
import { convertDateToDbFriendlyFormat } from '../helpers';

export class EndpointFacade implements IEndpointFacade {
    /**
     * Class constructor
     */
    constructor(private readonly endpointDao: IMonitoredEndpointDao) {}

    public async selectAllEndpoints(userId: number): Promise<MonitoredEndpointDto[]> {
        return await this.endpointDao.selectMonitoredEndpointsForUser(userId);
    }

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

    public async updateEndpoint(data: any, endpointId: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

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