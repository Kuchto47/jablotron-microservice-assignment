import { RestServer } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbSetUp } from "./db/DbSetUp";
import { Server } from "restify";
import { EndpointController } from "./api/EndpointController";
import { IBaseController } from './api/IBaseController';
import { UserController } from './api/UserController';
import { MonitoringResultController } from './api/MonitoringResultController';

function createRestServer(): Server {
    return new RestServer().createServer();
}

function prepareDb(): void {
    let dbFiller = new DbSetUp(new DbConnection());
    dbFiller.prepareDbSchema();
    dbFiller.seedDataIntoDb();
}

function registerRestEndpoints(server: Server): void {
    let controllers: IBaseController[] = [
        new EndpointController(server),
        new UserController(server),
        new MonitoringResultController(server)
    ];

    controllers.forEach((controller: IBaseController) => controller.register());
}

function start(): void {
    let server: Server = createRestServer();
    prepareDb();
    registerRestEndpoints(server);
}

start();