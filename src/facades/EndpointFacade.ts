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
    constructor(
        private readonly endpointDao: IMonitoredEndpointDao,
        private readonly userDao: IUserDao
    ) {}

    /**
     * Selects all Monitored Endpoints
     */
    public async selectAllEndpoints(): Promise<MonitoredEndpointDto[]> {
        return await this.endpointDao.selectAllMonitoredEndpoints();
    }

    /**
     * Inserts given endpoint into DB
     */
    public async insertEndpoint(userAccessToken: string, payload: MonitoredEndpointPayload): Promise<number> {
        let user: UserDto = await this.userDao.selectUserWithAccessToken(userAccessToken);
        let monitoredEndpoint: MonitoredEndpointDto = {
            name: payload.name,
            url: payload.url,
            creationDate: convertDateToDbFriendlyFormat(new Date()),
            monitoredInterval: payload.monitoredInterval,
            ownerId: user.id
        };
        return await this.endpointDao.insertMonitoredEndpoint(monitoredEndpoint);
    }
}