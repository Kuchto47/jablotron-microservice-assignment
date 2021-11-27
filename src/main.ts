import { Server } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbFiller } from "./db/DbFiller";

Server.createServer();

let dbFiller = new DbFiller(new DbConnection());
dbFiller.prepareDbSchema();
dbFiller.seedDataIntoDb();