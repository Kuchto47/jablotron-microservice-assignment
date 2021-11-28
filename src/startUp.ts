import { RestServer } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbSetUp } from "./db/DbSetUp";
import { Server } from "restify";
import { EndpointController } from "./api/EndpointController";
import { IBaseController } from './api/IBaseController';
import { UserController } from './api/UserController';
import { MonitoringResultController } from './api/MonitoringResultController';
import { IDbConnection } from './db/interfaces/IDbConnection';

export class StartUp {
    // private static monitoredEndpointFacade;
    // private static monitoringResultFacade;
    // private static userFacade;
    private static dbConnection: IDbConnection;

    public static start(): void {
        let server: Server = this.createRestServer();
        this.prepareDb();
        this.registerRestEndpoints(server);
    }

    private static createRestServer(): Server {
        return new RestServer().createServer();
    }

    private static prepareDb(): void {
        this.dbConnection = new DbConnection();
        let dbSetUp = new DbSetUp(this.dbConnection);
        dbSetUp.prepareDbSchema();
        dbSetUp.seedDataIntoDb();
    }

    private static registerRestEndpoints(server: Server): void {
        this.registerFacades();
        let controllers: IBaseController[] = [
            new EndpointController(server),
            new UserController(server),
            new MonitoringResultController(server)
        ];
    
        controllers.forEach((controller: IBaseController) => controller.register());
    }

    private static registerFacades(): void {
        /* TODO */
        // this.monitoredEndpointFacade = "";
        // this.monitoringResultFacade = "";
        // this.userFacade = "";
    }
}

