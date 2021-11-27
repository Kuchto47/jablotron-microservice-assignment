import { RestServer } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbFiller } from "./db/DbFiller";
import { Server } from "restify";
import { EndpointController } from "./api/EndpointController";

function createRestServer(): Server {
    return new RestServer().createServer();
}

function prepareDb() {
    let dbFiller = new DbFiller(new DbConnection());
    dbFiller.prepareDbSchema();
    dbFiller.seedDataIntoDb();
}

function registerRestEndpoints(server: Server) {
    let endpointController: EndpointController = new EndpointController(server);

    endpointController.register();
}

let server: Server = createRestServer();
prepareDb();
registerRestEndpoints(server);

