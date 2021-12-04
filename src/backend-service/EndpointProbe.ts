import { IMonitoredEndpointService } from "../services/interfaces/IMonitoredEndpointService";
import { IMonitoringResultService } from "../services/interfaces/IMonitoringResultService";
import { IEndpointProbe } from "./interfaces/IEndpointProbe";
import { IProbeMonitoredEndpoint } from "./interfaces/IProbeMonitoredEndpoint";
import { ProbeMonitoredEndpoint } from "./ProbeMonitoredEndpoint";

export class EndpointProbe implements IEndpointProbe {

    private monitoredEndpoints: Map<number, IProbeMonitoredEndpoint>;

    /**
     * Class constructor
     */
    constructor(
        private readonly monitoredEndpointService: IMonitoredEndpointService,
        private readonly monitoringResultService: IMonitoringResultService
    ) {
        this.monitoredEndpoints = new Map<number, IProbeMonitoredEndpoint>();
    }

    public async start(): Promise<void> {
        let allEndpoints = await this.monitoredEndpointService.selectAllEndpoints();
        allEndpoints.forEach(endpoint => {
            this.monitoredEndpoints.set(
                endpoint.id,
                new ProbeMonitoredEndpoint(
                    endpoint.id,
                    endpoint.url,
                    endpoint.monitoredInterval,
                    this.monitoringResultService,
                    this.monitoredEndpointService
                )
            );
        });
        console.log("Probe started...");
    }

    public async onInsert(endpointId: number): Promise<void> {
        let endpoint = await this.monitoredEndpointService.selectEndpointById(endpointId);
        this.monitoredEndpoints.set(
            endpointId,
            new ProbeMonitoredEndpoint(
                endpointId,
                endpoint.url,
                endpoint.monitoredInterval,
                this.monitoringResultService,
                this.monitoredEndpointService
            )
        );
    }

    public async onUpdate(endpointId: number): Promise<void> {
        let endpoint = await this.monitoredEndpointService.selectEndpointById(endpointId);
        this.monitoredEndpoints
            .get(endpointId)
            .updateMetaData(endpoint.url, endpoint.monitoredInterval);
    }

    public async onDelete(endpointId: number): Promise<void> {
        this.monitoredEndpoints.get(endpointId).cancelMonitoring();
        this.monitoredEndpoints.delete(endpointId);
    }

}