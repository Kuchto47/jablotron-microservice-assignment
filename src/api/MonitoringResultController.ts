import { Server, Request, Response } from "restify";
import { IBaseController } from './IBaseController';
import { IUserService } from '../services/interfaces/IUserService';
import { authenticateUser } from "./authenticator";
import { IMonitoringResultService } from '../services/interfaces/IMonitoringResultService';

/**
 * Class representing MonitoringResult, responsible for monitoring result REST calls
 */
export class MonitoringResultController implements IBaseController {
    /**
     * MonitoringResult Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(
        private readonly server: Server,
        private readonly userService: IUserService,
        private readonly monitoringResultService: IMonitoringResultService
    ) {}

    /**
     * Registers all MonitoringResult endpoints
     */
    public register(): void {
        this.registerGetLast10ResultsForEndpoint();
    }

    /**
     * Registers /monitoring GET endpoint
     */
     private registerGetLast10ResultsForEndpoint(): void {
        this.server.get("/monitoring/:id", async (request: Request, response: Response) => {
            let userId = await authenticateUser(request, response, this.userService);
            if (!userId) return;
            response.end("Get All MonitoringResults called, Implementation TODO!");
        });
    }
}