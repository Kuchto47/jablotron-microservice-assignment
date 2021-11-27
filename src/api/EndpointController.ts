import { Request, Server } from "restify";
import { MonitoredEndpointDto } from '../db/schema/model';
import { IBaseController } from './IBaseController';

export class EndpointController implements IBaseController {

    /**
     * Endpoint Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(private readonly server: Server) {}

    /**
     * 
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
     * 
     */
    private registerGetAll(): void {
        this.server.get("/endpoints", (_: Request, result: any) => {
            result.end("Get All Endpoints called, Implementation TODO!");
        });
    }

    /**
     * 
     */
    private registerGetById(): void {
        this.server.get("/endpoints/:id", (request: Request, result: any) => {
            result.end(`Get Endpoint by ID (${request.params.id}) called, Implementation TODO!`);
        });
    }

    /**
     * 
     */
    private registerGetByOwnersId(): void {
        this.server.get("/endpoints/owner/:id", (request: Request, result: any) => {
            result.end(`Get Endpoint by owners ID (${request.params.id}) called, Implementation TODO!`);
        });
    }

    /**
     * 
     */
    private registerPostEndpoint(): void {
        this.server.post("/endpoints", (request: Request, result: any) => {
            let postData: MonitoredEndpointDto = request.body;
            result.end(`Post Endpoint with data (${JSON.stringify(postData)}) called, Implementation TODO!`);
        });
    }

    /**
     * 
     */
    private registerPutEndpoint(): void {
        this.server.put("/endpoints", (request: Request, result: any) => {
            let postData: MonitoredEndpointDto = request.body;
            result.end(`Put (update) Endpoint with data (${JSON.stringify(postData)}) called, Implementation TODO!`);
        });
    }

    /**
     * 
     */
    private registerDeleteEndpointById(): void {
        this.server.put("/endpoints/:id", (request: Request, result: any) => {
            result.end(`Delete Endpoint by ID (${request.params.id}) called, Implementation TODO!`);
        });
    }
}