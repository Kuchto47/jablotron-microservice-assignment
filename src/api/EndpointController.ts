import { Request, Server, Response } from "restify";
import { MonitoredEndpointDto } from '../db/model';
import { IBaseController } from './IBaseController';
import { IMonitoredEndpointService } from '../services/interfaces/IMonitoredEndpointService';
import { MonitoredEndpointPayload } from '../services/model';
import { IUserService } from "../services/interfaces/IUserService";
import { authenticateUser } from "./authenticator";
import { ResponseCode } from '../ResponseCode';

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
        private readonly endpointService: IMonitoredEndpointService,
        private readonly userService: IUserService,
        private readonly onInsert: (endpointId: number) => Promise<void>,
        private readonly onUpdate: (endpointId: number) => Promise<void>,
        private readonly onDelete: (endpointId: number) => Promise<void>
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
            let data: MonitoredEndpointDto[] = await this.endpointService.selectAllEndpointsForUser(userId);
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
            let newId = await this.endpointService.insertEndpoint(userId, postData);
            this.onInsert(newId);
            response.end(`${newId}`);
        });
    }

    /**
     * Registers /endpoints PUT endpoint
     */
    private registerUpdateEndpoint(): void {
        this.server.put("/endpoints/:id", async (request: Request, response: Response) => {
            let userId = await authenticateUser(request, response, this.userService);
            if (!userId) return;
            let endpointId = Number.parseInt(request.params.id);
            let postData: MonitoredEndpointPayload = request.body as MonitoredEndpointPayload;
            let updateResult = await this.endpointService.updateEndpoint(postData, endpointId, userId);
            if (updateResult) this.onUpdate(endpointId);
            response.status(updateResult ? ResponseCode.OK : ResponseCode.NOT_FOUND);
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
            let endpointId = Number.parseInt(request.params.id);
            let deletionResult = await this.endpointService.deleteEndpoint(endpointId, userId);
            if (deletionResult) this.onDelete(endpointId);
            response.status(deletionResult ? ResponseCode.OK : ResponseCode.NOT_FOUND);
            response.end(`Endpoint with Id ${request.params.id} ${deletionResult ? 'was' : 'wasn\'t'} deleted.`);
        });
    }
}