import { IProbeMonitoredEndpoint } from './interfaces/IProbeMonitoredEndpoint';
import { IMonitoringResultService } from '../services/interfaces/IMonitoringResultService';
import { IMonitoredEndpointService } from '../services/interfaces/IMonitoredEndpointService';
import { MonitoringResultDto } from '../db/model';
import { convertDateToDbFriendlyFormat } from '../helpers';
import { ResponseCode } from '../ResponseCode';
import axios from 'axios';

export class ProbeMonitoredEndpoint implements IProbeMonitoredEndpoint {

    private intervalFn: NodeJS.Timer;

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

    public cancelMonitoring(): void {
        this.cancelIntervalFn();
    }

    private setIntervalFn() {
        this.intervalFn = setInterval(async () => {
            let statusCode: number;
            let body: string = "";
            let date: string = convertDateToDbFriendlyFormat(new Date());
            try {
                let response = await axios.get(this.url);
                statusCode = response.status;
                body = response.data;
            } catch(e) {
                statusCode = ResponseCode.TEAPOT;
                body = "I'm a teapot";
            } finally {
                this.persistMonitoringResult(date, statusCode, body);
            }
        }, this.intervalTime * 1000);
    }

    private async persistMonitoringResult(date: string, statusCode: number, payload: string): Promise<void> {
        await this.monitoringResultService.insertResult(this.createMonitoringResult(date, statusCode, payload));
        await this.monitoredEndpointService.updateEndpointsLastCheckDate(date, this.endpointId);
    }

    private createMonitoringResult(date: string, statusCode: number, payload: string): MonitoringResultDto {
        return {
            checkDate: date,
            responseCode: statusCode,
            payloadReturned: payload,
            monitoredEndpointId: this.endpointId
        };
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