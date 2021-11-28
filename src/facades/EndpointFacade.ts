import { IMonitoredEndpointDao } from '../dao/interfaces/IMonitoredEndpointDao';
import { IUserDao } from '../dao/interfaces/IUserDao';
import { UserDto, MonitoredEndpointDto } from '../db/schema/model';
import { MonitoredEndpointPayload } from './model';
import { IEndpointFacade } from './interfaces/IEndpointFacade';

export class EndpointFacade implements IEndpointFacade {
    /**
     * Class constructor
     */
    constructor(
        private readonly endpointDao: IMonitoredEndpointDao,
        private readonly userDao: IUserDao
    ) {}

    /**
     * Inserts given endpoint into DB
     */
    public async insertEndpoint(userAccessToken: string, payload: MonitoredEndpointPayload): Promise<number> {
        let user: UserDto = await this.userDao.selectUserWithAccessToken(userAccessToken);
        let monitoredEndpoint: MonitoredEndpointDto = {
            name: payload.name,
            url: payload.url,
            creationDate: Date.now(),
            lastCheckDate: null,
            monitoredInterval: payload.monitoredInterval,
            ownerId: user.id
        };
        await this.endpointDao.insertMonitoredEndpoint(monitoredEndpoint);
        return 0;
    }
}