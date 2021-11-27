import { RestServer } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbFiller } from "./db/DbFiller";
import { Server } from "restify";
import { EndpointController } from "./api/EndpointController";
import { IBaseController } from './api/IBaseController';
import { UserController } from './api/UserController';

function createRestServer(): Server {
    return new RestServer().createServer();
}

function prepareDb() {
    let dbFiller = new DbFiller(new DbConnection());
    dbFiller.prepareDbSchema();
    dbFiller.seedDataIntoDb();
}

function registerRestEndpoints(server: Server) {
    let controllers: IBaseController[] = [
        new EndpointController(server),
        new UserController(server)
    ];

    controllers.forEach((controller: IBaseController) => controller.register());
}

let server: Server = createRestServer();
prepareDb();
registerRestEndpoints(server);

