import { MonitoringResultDto } from '../db/model';
import { IMonitoringResultService } from './interfaces/IMonitoringResultService';
import { IMonitoringResultDao } from '../dao/interfaces/IMonitoringResultDao';
import { IMonitoredEndpointDao } from '../dao/interfaces/IMonitoredEndpointDao';

export class MonitoringResultService implements IMonitoringResultService {

    /**
     * Class constructor
     */
    constructor(
        private readonly monitoringResultDao: IMonitoringResultDao,
        private readonly monitoredEndpointDao: IMonitoredEndpointDao
    ) {}

    public async insertResult(payload: MonitoringResultDto): Promise<number> {
        return await this.monitoringResultDao.insertMonitoringResult(payload);
    }

    public async selectLast10ResultsForEndpoint(endpointId: number, userId: number): Promise<MonitoringResultDto[]> {
        try {
            let endpoint = await this.monitoredEndpointDao.selectMonitoredEndpointById(endpointId);
            if (endpoint.ownerId !== userId) throw new Error("Unauthorized!");
            return await this.monitoringResultDao.selectLast10MonitoringResultsForEndpoint(endpointId);
        } catch(err) {
            throw err;
        }
    }
}