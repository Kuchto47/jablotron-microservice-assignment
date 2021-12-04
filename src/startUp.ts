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
import { MonitoredEndpointDao } from './dao/MonitoredEndpointDao';
import { IEndpointService } from './services/interfaces/IEndpointService';
import { EndpointService } from './services/EndpointService';
import { IMonitoringResultService } from './services/interfaces/IMonitoringResultService';
import { MonitoringResultService } from './services/MonitoringResultService';
import { IUserService } from "./services/interfaces/IUserService";
import { UserService } from "./services/UserService";
import { IMonitoringResultDao } from "./dao/interfaces/IMonitoringResultDao";
import { MonitoringResultDao } from "./dao/MonitoringResultDao";
import { EndpointProbe } from "./backend-service/EndpointProbe";
import { IEndpointProbe } from "./backend-service/IEndpointProbe";

export class StartUp {
    private static monitoredEndpointFacade: IEndpointService;
    private static monitoringResultFacade: IMonitoringResultService;
    private static userFacade: IUserService;

    private static monitoredEndpointDao: IMonitoredEndpointDao;
    private static monitoringResultDao: IMonitoringResultDao;
    private static userDao: IUserDao;

    private static monitoredEndpointsProbe: IEndpointProbe;

    private static dbConnection: IDbConnection;

    public static start(): void {
        let server: Server = this.createRestServer();
        this.prepareDb();
        this.registerDaos();
        this.registerFacades();
        //this.startMonitoringEndpoints();
        this.registerControllers(server);
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
        let connection = this.dbConnection.getMySqlConnection();
        this.userDao = new UserDao(connection);
        this.monitoredEndpointDao = new MonitoredEndpointDao(connection);
        this.monitoringResultDao = new MonitoringResultDao(connection);
    }

    private static registerFacades(): void {
        this.monitoredEndpointFacade = new EndpointService(this.monitoredEndpointDao);
        this.monitoringResultFacade = new MonitoringResultService();
        this.userFacade = new UserService(this.userDao);
    }

    private static startMonitoringEndpoints(): void {
        this.monitoredEndpointsProbe = new EndpointProbe();
        this.monitoredEndpointsProbe.start();
    }

    private static registerControllers(server: Server): void {
        /*TODO: Controllers should get on-methods of EndpointProbe as dependencies too */
        let controllers: IBaseController[] = [
            new EndpointController(server, this.monitoredEndpointFacade, this.userFacade),
            new UserController(server),
            new MonitoringResultController(server)
        ];
    
        controllers.forEach((controller: IBaseController) => controller.register());
    }
}

