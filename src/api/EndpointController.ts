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

    /**
     * Registers all Endpoint endpoints
     */
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
        this.server.get("/endpoints", async (request: Request, result: Response) => {
            let authenticationResult = await this.authenticateUser(request.headers.authorization);
            if (!authenticationResult) {
                result.status(404);
                result.end();
                return;
            }
            let data: MonitoredEndpointDto[] = await this.endpointFacade.selectAllEndpoints(authenticationResult);
            result.end(JSON.stringify(data));
        });
    }

    /**
     * Registers /endpoints POST endpoint
     */
    private registerInsertEndpoint(): void {
        this.server.post("/endpoints", async (request: Request, result: any) => {
            /*TODO Authentication & Authorization*/
            let postData: MonitoredEndpointDto = request.body;
            result.end(`${await this.endpointFacade.insertEndpoint(/*TODO Authentication & Authorization*/"93f39e2f-80de-4033-99ee-249d92736a25", postData)}`);
        });
    }

    /**
     * Registers /endpoints PUT endpoint
     */
    private registerUpdateEndpoint(): void {
        this.server.put("/endpoints/:id", async (request: Request, result: any) => {
            /*TODO Authentication & Authorization*/
            let postData: MonitoredEndpointPayload = request.body;
            result.end(`${await this.endpointFacade.updateEndpoint(postData, request.params.id)}`);
            //result.end(`Put (update) Endpoint with data (${JSON.stringify(postData)}) called, Implementation TODO!`);
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

    private async authenticateUser(accessToken: string): Promise<number | null> {
        return await this.userFacade.authenticate(accessToken);
    }
}