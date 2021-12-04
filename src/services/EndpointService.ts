import { IMonitoredEndpointDao } from '../dao/interfaces/IMonitoredEndpointDao';
import { MonitoredEndpointDto } from '../db/model';
import { MonitoredEndpointPayload } from './model';
import { IEndpointService } from './interfaces/IEndpointService';
import { convertDateToDbFriendlyFormat } from '../helpers';

export class EndpointService implements IEndpointService {
    /**
     * Class constructor
     */
    constructor(private readonly monitoredEndpointDao: IMonitoredEndpointDao) {}

    public async selectAllEndpoints(userId: number): Promise<MonitoredEndpointDto[]> {
        return await this.monitoredEndpointDao.selectMonitoredEndpointsForUser(userId);
    }

    public async insertEndpoint(userId: number, payload: MonitoredEndpointPayload): Promise<number> {
        let monitoredEndpoint: MonitoredEndpointDto = {
            name: payload.name,
            url: payload.url,
            creationDate: convertDateToDbFriendlyFormat(new Date()),
            monitoredInterval: payload.monitoredInterval,
            ownerId: userId
        };
        return await this.monitoredEndpointDao.insertMonitoredEndpoint(monitoredEndpoint);
    }

    public async updateEndpoint(data: MonitoredEndpointPayload, endpointId: number, userId: number): Promise<boolean> {
        try {
            let ownedEndpoint = await this.monitoredEndpointDao.selectMonitoredEndpointWithIdForUser(endpointId, userId);
            ownedEndpoint.name = data.name ?? ownedEndpoint.name;
            ownedEndpoint.monitoredInterval = data.monitoredInterval ?? ownedEndpoint.monitoredInterval;
            ownedEndpoint.url = data.url ?? ownedEndpoint.url;
            return await this.monitoredEndpointDao.updateMonitoredEndpoint(ownedEndpoint);
        } catch(_) {
            return false;
        }
    }

    public async deleteEndpoint(endpointId: number, userId: number): Promise<boolean> {
        try {
            let ownedEndpoints = await this.monitoredEndpointDao.selectMonitoredEndpointsForUser(userId);
            if (!ownedEndpoints.find(x => x.id === endpointId)) return false;
            return await this.monitoredEndpointDao.deleteEndpoint(endpointId);
        } catch (_) {
            return false;
        }
    }
}