import { Server, Request } from "restify";
import { IBaseController } from './IBaseController';

/**
 * Class representing MonitoringResult, responsible for monitoring result REST calls
 */
export class MonitoringResultController implements IBaseController {
    /**
     * MonitoringResult Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(private readonly server: Server) {}

    /**
     * Registers all MonitoringResult endpoints
     */
    public register(): void {
        this.registerGetAll();
    }

    /**
     * Registers /monitoring GET endpoint
     */
    private registerGetAll(): void {
        this.server.get("/monitoring", (_: Request, result: any) => {
            result.end("Get All MonitoringResults called, Implementation TODO!");
        });
    }
}