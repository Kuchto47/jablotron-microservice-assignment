import { IProbeMonitoredEndpoint } from './IProbeMonitoredEndpoint';
import { MonitoringResultDto } from '../db/model';

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
        private persistResultFn: (payload: MonitoringResultDto) => Promise<number>
    ) {
        this.setIntervalFn();
    }

    public updateMetaData(url: string, intervalTime: number): void {
        const updateUrl: boolean = this.shouldUpdateUrl(url);
        const updateTime: boolean = this.shouldUpdateIntervalTime(intervalTime);
        if (updateUrl) this.url = url;
        if (updateTime) this.intervalTime = intervalTime;
        if (updateUrl || updateTime) //cancel interval function and create new one
            return;
    }

    private setIntervalFn() {
        this.intervalFn = setInterval(() => {

        }, this.intervalTime);
    }

    private shouldUpdateUrl(url: string): boolean {
        return this.url !== url;
    }

    private shouldUpdateIntervalTime(time: number): boolean {
        return this.intervalTime !== time;
    }
}