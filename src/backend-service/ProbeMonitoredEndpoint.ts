import { IProbeMonitoredEndpoint } from './interfaces/IProbeMonitoredEndpoint';
import { IMonitoringResultService } from '../services/interfaces/IMonitoringResultService';
import { IMonitoredEndpointService } from '../services/interfaces/IMonitoredEndpointService';
import { MonitoringResultDto } from '../db/model';
import { convertDateToDbFriendlyFormat } from '../helpers';

export class ProbeMonitoredEndpoint implements IProbeMonitoredEndpoint {

    private intervalFn: any;

    /**
     * Class constructor
     * 
     * @param url url to monitor
     * 
     * @param intervalTime how many seconds between 2 monitorings
     * 
     * @param monitoredEndpointService
     * 
     * @param monitoringResultService
     */
    constructor(
        private readonly endpointId: number,
        private url: string,
        private intervalTime: number,
        private readonly monitoringResultService: IMonitoringResultService,
        private readonly monitoredEndpointService: IMonitoredEndpointService
    ) {
        this.setIntervalFn();
    }

    public updateMetaData(url: string, intervalTime: number): void {
        const updateUrl: boolean = this.shouldUpdateUrl(url);
        const updateTime: boolean = this.shouldUpdateIntervalTime(intervalTime);
        if (updateUrl) this.url = url;
        if (updateTime) this.intervalTime = intervalTime;
        if (updateUrl || updateTime) this.refreshIntervalFn();
    }

    private setIntervalFn() {
        this.intervalFn = setInterval(async () => {
            //fetch url...
            let date: string = convertDateToDbFriendlyFormat(new Date());
            let result: MonitoringResultDto = {
                checkDate: date,
                responseCode: 200, //todo
                payloadReturned: "", //todo
                monitoredEndpointId: this.endpointId
            };
            let newMonitoringResultId = await this.monitoringResultService.insertResult(result);
            let monitoredEndpointUpdated = await this.monitoredEndpointService.updateEndpointsLastCheckDate(date, this.endpointId);
            console.log(`New monitoring result created, ID ${newMonitoringResultId}`);
            console.log(`Endpoint with ID ${this.endpointId} ${monitoredEndpointUpdated ? 'successfully' : 'was not'} updated`);
        }, this.intervalTime);
    }

    private refreshIntervalFn() {
        this.cancelIntervalFn();
        this.setIntervalFn();
    }

    private cancelIntervalFn() {
        clearInterval(this.intervalFn);
    }

    private shouldUpdateUrl(url: string): boolean {
        return this.url !== url;
    }

    private shouldUpdateIntervalTime(time: number): boolean {
        return this.intervalTime !== time;
    }
}