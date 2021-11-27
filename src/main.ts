import { RestServer } from "./server";
import { DbConnection } from './db/DbConnection';
import { DbFiller } from "./db/DbFiller";

let server = new RestServer().createServer();

let dbFiller = new DbFiller(new DbConnection());
dbFiller.prepareDbSchema();
dbFiller.seedDataIntoDb();