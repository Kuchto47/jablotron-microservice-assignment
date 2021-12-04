import { IProbeMonitoredEndpoint } from './interfaces/IProbeMonitoredEndpoint';
import { IMonitoringResultService } from '../services/interfaces/IMonitoringResultService';
import { IMonitoredEndpointService } from '../services/interfaces/IMonitoredEndpointService';

export class ProbeMonitoredEndpoint implements IProbeMonitoredEndpoint {

    private intervalFn: any;

    /**
     * Class constructor
     * 
     * @param url url to monitor
     * 
     * @param intervalTime how many seconds between 2 monitorings
     */
    constructor(
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
        this.intervalFn = setInterval(() => {

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