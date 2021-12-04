import { Server, Request, Response, RequestAuthorization } from "restify";
import { IBaseController } from './IBaseController';
import { IUserService } from '../services/interfaces/IUserService';
import { authenticateUser } from "./authenticator";
import { IMonitoringResultService } from '../services/interfaces/IMonitoringResultService';
import { MonitoringResultDto } from '../db/model';
import { ResponseCode } from './ResponseCode';

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
            try {
                let results: MonitoringResultDto[] = await this.monitoringResultService.selectLast10ResultsForEndpoint(request.params.id, userId);
                MonitoringResultController.sendResponse(response, ResponseCode.OK, JSON.stringify(results));
            } catch (_) {
                MonitoringResultController.sendResponse(response, ResponseCode.NOT_FOUND, "");
            }
        });
    }

    private static sendResponse(response: Response, statusCode: number, payload: string) {
        response.status(statusCode);
        response.end(payload);
    }
}