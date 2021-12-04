import { Request, Server, Response } from "restify";
import { MonitoredEndpointDto } from '../db/model';
import { IBaseController } from './IBaseController';
import { IEndpointService } from '../services/interfaces/IEndpointService';
import { MonitoredEndpointPayload } from '../services/model';
import { IUserService } from "../services/interfaces/IUserService";
import { authenticateUser } from "./authenticator";

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
        private readonly endpointService: IEndpointService,
        private readonly userService: IUserService
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
            let userId = await authenticateUser(request, response, this.userService);
            if (!userId) return;
            let data: MonitoredEndpointDto[] = await this.endpointService.selectAllEndpoints(userId);
            response.end(JSON.stringify(data));
        });
    }

    /**
     * Registers /endpoints POST endpoint
     */
    private registerInsertEndpoint(): void {
        this.server.post("/endpoints", async (request: Request, response: Response) => {
            let userId = await authenticateUser(request, response, this.userService);
            if (!userId) return;
            let postData: MonitoredEndpointPayload = request.body as MonitoredEndpointPayload;
            response.end(`${await this.endpointService.insertEndpoint(userId, postData)}`);
        });
    }

    /**
     * Registers /endpoints PUT endpoint
     */
    private registerUpdateEndpoint(): void {
        this.server.put("/endpoints/:id", async (request: Request, response: Response) => {
            let userId = await authenticateUser(request, response, this.userService);
            if (!userId) return;
            let postData: MonitoredEndpointPayload = request.body as MonitoredEndpointPayload;
            let updateResult = await this.endpointService.updateEndpoint(postData, Number.parseInt(request.params.id), userId);
            response.status(updateResult ? 200 : 404);
            response.end(`Endpoint with Id ${request.params.id} ${updateResult ? 'was' : 'wasn\'t'} updated`);
        });
    }

    /**
     * Registers /endpoints DELETE endpoint
     */
    private registerDeleteEndpointById(): void {
        this.server.del("/endpoints/:id", async (request: Request, response: Response) => {
            let userId = await authenticateUser(request, response, this.userService);
            if (!userId) return;
            let deletionResult = await this.endpointService.deleteEndpoint(Number.parseInt(request.params.id), userId);
            response.status(deletionResult ? 200 : 404);
            response.end(`Endpoint with Id ${request.params.id} ${deletionResult ? 'was' : 'wasn\'t'} deleted.`);
        });
    }
}