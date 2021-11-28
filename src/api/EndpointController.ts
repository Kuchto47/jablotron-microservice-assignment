import { Request, Server } from "restify";
import { MonitoredEndpointDto } from '../db/schema/model';
import { IBaseController } from './IBaseController';
import { IEndpointFacade } from '../facades/interfaces/IEndpointFacade';

/**
 * Class representing EndpointController responsible for Endpoint REST calls
 */
export class EndpointController implements IBaseController {

    /**
     * Endpoint Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(private readonly server: Server, private readonly endpointFacade: IEndpointFacade) {}

    /**
     * Registers all Endpoint endpoints
     */
    public register() {
        this.registerGetAll();
        this.registerGetById();
        this.registerGetByOwnersId();
        this.registerPostEndpoint();
        this.registerPutEndpoint();
        this.registerDeleteEndpointById();
    }

    /**
     * Registers /endpoints GET endpoint
     */
    private registerGetAll(): void {
        this.server.get("/endpoints", async (_: Request, result: any) => {
            let data: MonitoredEndpointDto[] = await this.endpointFacade.selectAllEndpoints();
            result.end(JSON.stringify(data));
        });
    }

    /**
     * Registers /endpoints/:id GET endpoint
     */
    private registerGetById(): void {
        this.server.get("/endpoints/:id", (request: Request, result: any) => {
            result.end(`Get Endpoint by ID (${request.params.id}) called, Implementation TODO!`);
        });
    }

    /**
     * Registers /endpoints/owner/:id GET endpoint
     */
    private registerGetByOwnersId(): void {
        this.server.get("/endpoints/owner/:id", (request: Request, result: any) => {
            result.end(`Get Endpoint by owners ID (${request.params.id}) called, Implementation TODO!`);
        });
    }

    /**
     * Registers /endpoints POST endpoint
     */
    private registerPostEndpoint(): void {
        this.server.post("/endpoints", (request: Request, result: any) => {
            let postData: MonitoredEndpointDto = request.body;
            result.end(`Post Endpoint with data (${JSON.stringify(postData)}) called, Implementation TODO!`);
        });
    }

    /**
     * Registers /endpoints PUT endpoint
     */
    private registerPutEndpoint(): void {
        this.server.put("/endpoints", (request: Request, result: any) => {
            let postData: MonitoredEndpointDto = request.body;
            result.end(`Put (update) Endpoint with data (${JSON.stringify(postData)}) called, Implementation TODO!`);
        });
    }

    /**
     * Registers /endpoints GET endpoint
     */
    private registerDeleteEndpointById(): void {
        this.server.del("/endpoints/:id", (request: Request, result: any) => {
            result.end(`Delete Endpoint by ID (${request.params.id}) called, Implementation TODO!`);
        });
    }
}