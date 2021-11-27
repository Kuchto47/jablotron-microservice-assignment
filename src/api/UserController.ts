import { Server, Request } from "restify";
import { IBaseController } from './IBaseController';

/**
 * Class representing UserController, responsible for user REST calls
 */
export class UserController implements IBaseController {
    /**
     * User Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(private readonly server: Server) {}

    /**
     * Registers all User endpoints
     */
    public register(): void {
        this.registerGetAll();
    }

    /**
     * Registers /users GET endpoint
     */
    private registerGetAll(): void {
        this.server.get("/users", (_: Request, result: any) => {
            result.end("Get All Users called, Implementation TODO!");
        });
    }
}