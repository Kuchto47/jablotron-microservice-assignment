import { RestServer } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbSetUp } from "./db/DbSetUp";
import { Server } from "restify";
import { EndpointController } from "./api/EndpointController";
import { IBaseController } from './api/IBaseController';
import { UserController } from './api/UserController';
import { MonitoringResultController } from './api/MonitoringResultController';
import { IDbConnection } from './db/interfaces/IDbConnection';
import { UserDao } from './dao/UserDao';
import { IUserDao } from './dao/interfaces/IUserDao';
import { IMonitoredEndpointDao } from './dao/interfaces/IMonitoredEndpointDao';
import { EndpointDao } from './dao/EndpointDao';
import { IEndpointFacade } from './facades/interfaces/IEndpointFacade';
import { EndpointFacade } from './facades/EndpointFacade';

export class StartUp {
    private static monitoredEndpointFacade: IEndpointFacade;
    // private static monitoringResultFacade;
    // private static userFacade;

    private static monitoredEndpointDao: IMonitoredEndpointDao;
    // private static monitoringResultDao;
    private static userDao: IUserDao;

    private static dbConnection: IDbConnection;

    public static start(): void {
        let server: Server = this.createRestServer();
        this.prepareDb();
        this.registerDaos();
        this.registerFacades();
        this.registerRestEndpoints(server);
    }

    private static createRestServer(): Server {
        return new RestServer().createServer();
    }

    private static prepareDb(): void {
        this.dbConnection = new DbConnection();
        let dbSetUp = new DbSetUp(this.dbConnection);
        dbSetUp.prepareDbSchema().then().seedDataIntoDb();
    }

    private static registerDaos(): void {
        /* TODO */
        this.userDao = new UserDao(this.dbConnection.getMySqlConnection());
        this.monitoredEndpointDao = new EndpointDao(this.dbConnection.getMySqlConnection());
        //this.monitoringResultDao
    }

    private static registerFacades(): void {
        /* TODO */
        this.monitoredEndpointFacade = new EndpointFacade(this.monitoredEndpointDao, this.userDao);
        // this.monitoringResultFacade = "";
        // this.userFacade = "";
    }

    private static registerRestEndpoints(server: Server): void {
        let controllers: IBaseController[] = [
            new EndpointController(server, this.monitoredEndpointFacade),
            new UserController(server),
            new MonitoringResultController(server)
        ];
    
        controllers.forEach((controller: IBaseController) => controller.register());
    }
}

