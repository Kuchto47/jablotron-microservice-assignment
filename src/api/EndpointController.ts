import { Request, Server, Response } from "restify";
import { MonitoredEndpointDto } from '../db/model';
import { IBaseController } from './IBaseController';
import { IEndpointFacade } from '../facades/interfaces/IEndpointFacade';
import { MonitoredEndpointPayload } from '../facades/model';
import { IUserFacade } from "../facades/interfaces/IUserFacade";

/**
 * Class representing EndpointController responsible for Endpoint REST calls
 */
export class EndpointController implements IBaseController {

    /**
     * Endpoint Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(
        private readonly server: Server,
        private readonly endpointFacade: IEndpointFacade,
        private readonly userFacade: IUserFacade
    ) {}

    
    public register() {
        this.registerGetAll();
        this.registerInsertEndpoint();
        this.registerUpdateEndpoint();
        this.registerDeleteEndpointById();
    }

    /**
     * Registers /endpoints GET endpoint
     */
    private registerGetAll(): void {
        this.server.get("/endpoints", async (request: Request, response: Response) => {
            let userId = await this.authUser(request, response);
            if (!userId) return;
            let data: MonitoredEndpointDto[] = await this.endpointFacade.selectAllEndpoints(userId);
            response.end(JSON.stringify(data));
        });
    }

    /**
     * Registers /endpoints POST endpoint
     */
    private registerInsertEndpoint(): void {
        this.server.post("/endpoints", async (request: Request, response: Response) => {
            let userId = await this.authUser(request, response);
            if (!userId) return;
            let postData: MonitoredEndpointPayload = request.body as MonitoredEndpointPayload;
            response.end(`${await this.endpointFacade.insertEndpoint(userId, postData)}`);
        });
    }

    /**
     * Registers /endpoints PUT endpoint
     */
    private registerUpdateEndpoint(): void {
        this.server.put("/endpoints/:id", async (request: Request, response: Response) => {
            let userId = await this.authUser(request, response);
            if (!userId) return;
            let postData: MonitoredEndpointPayload = request.body as MonitoredEndpointPayload;
            response.end(`${await this.endpointFacade.updateEndpoint(postData, Number.parseInt(request.params.id), userId)}`);
        });
    }

    /**
     * Registers /endpoints DELETE endpoint
     */
    private registerDeleteEndpointById(): void {
        this.server.del("/endpoints/:id", async (request: Request, response: Response) => {
            let userId = await this.authUser(request, response);
            if (!userId) return;
            let deletionResult = await this.endpointFacade.deleteEndpoint(Number.parseInt(request.params.id), userId);
            response.status(deletionResult ? 200 : 404);
            response.end(`Endpoint with Id ${request.params.id} ${deletionResult ? 'was' : 'wasn\'t'} deleted.`);
        });
    }

    private async authUser(request: Request, response: Response): Promise<number | null> {
        let authenticatedUserId = await this.userFacade.authenticate(request.headers.authorization);
        if (!authenticatedUserId) this.unathorized(response);
        return authenticatedUserId;
    }

    private unathorized(response: Response): void {
        response.status(401);
        response.end();
    }
}