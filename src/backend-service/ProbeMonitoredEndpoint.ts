import { IProbeMonitoredEndpoint } from './interfaces/IProbeMonitoredEndpoint';
import { IMonitoringResultService } from '../services/interfaces/IMonitoringResultService';
import { IMonitoredEndpointService } from '../services/interfaces/IMonitoredEndpointService';
import { MonitoringResultDto } from '../db/model';
import { convertDateToDbFriendlyFormat } from '../helpers';
import { get, IncomingMessage } from 'http';
import { ResponseCode } from '../ResponseCode';

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
        this.intervalFn = setInterval(() => {
            let statusCode: number;
            let body: string = "";
            let date: string = convertDateToDbFriendlyFormat(new Date());
            get(this.url, (response: IncomingMessage) => {
                statusCode = response.statusCode;
                response.setEncoding('utf8');
                response.on("data", (chunk: any) => {
                    body += chunk;
                });
                response.on("end", () => {
                    this.persistMonitoringResult(date, statusCode, body);
                });
            }).on("error", (e: Error) => {
                statusCode = ResponseCode.TEAPOT;
                body = `I'm a teapot, error message: ${e.message}`;
                this.persistMonitoringResult(date, statusCode, body);
            });
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