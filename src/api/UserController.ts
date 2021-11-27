import { Server, Request } from "restify";
import { IBaseController } from './IBaseController';

export class UserController implements IBaseController {
    /**
     * User Controller constructor
     * @param server Server on which controller should operate
     */
    constructor(private readonly server: Server) {}

    /**
     * 
     */
    public register(): void {
        this.registerGetAll();
    }

    /**
     * 
     */
    private registerGetAll(): void {
        this.server.get("/users", (_: Request, result: any) => {
            result.end("Get All Users called, Implementation TODO!");
        });
    }
}