import { Request, Server } from "restify";
import { MonitoredEndpointDto } from '../db/model';
import { IBaseController } from './IBaseController';
import { IEndpointFacade } from '../facades/interfaces/IEndpointFacade';
import { MonitoredEndpointPayload } from '../facades/model';

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
        this.registerPostEndpoint();
        this.registerPutEndpoint();
        this.registerDeleteEndpointById();
    }

    /**
     * Registers /endpoints GET endpoint
     */
    private registerGetAll(): void {
        this.server.get("/endpoints", async (_: Request, result: any) => {
            /*TODO Authentication & Authorization*/
            let data: MonitoredEndpointDto[] = await this.endpointFacade.selectAllEndpoints(/*TODO Authentication & Authorization*/"93f39e2f-80de-4033-99ee-249d92736a25");
            result.end(JSON.stringify(data));
        });
    }

    /**
     * Registers /endpoints POST endpoint
     */
    private registerPostEndpoint(): void {
        this.server.post("/endpoints", async (request: Request, result: any) => {
            /*TODO Authentication & Authorization*/
            let postData: MonitoredEndpointDto = request.body;
            result.end(`${await this.endpointFacade.insertEndpoint(/*TODO Authentication & Authorization*/"93f39e2f-80de-4033-99ee-249d92736a25", postData)}`);
        });
    }

    /**
     * Registers /endpoints PUT endpoint
     */
    private registerPutEndpoint(): void {
        this.server.put("/endpoints", (request: Request, result: any) => {
            /*TODO Authentication & Authorization*/
            let postData: MonitoredEndpointPayload = request.body;
            result.end(`Put (update) Endpoint with data (${JSON.stringify(postData)}) called, Implementation TODO!`);
        });
    }

    /**
     * Registers /endpoints DELETE endpoint
     */
    private registerDeleteEndpointById(): void {
        this.server.del("/endpoints/:id", (request: Request, result: any) => {
            /*TODO Authentication & Authorization*/
            result.end(`Delete Endpoint by ID (${request.params.id}) called, Implementation TODO!`);
        });
    }
}