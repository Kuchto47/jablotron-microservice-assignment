import { Request, Server } from "restify";

export class EndpointController {

    /**
     * Endpoint Controller constructor
     */
    constructor(private readonly server: Server) {}

    public register() {
        this.registerGetAll();
    }

    private registerGetAll() {
        this.server.get("/endpoints", (request: Request, result) => {
            result.end("Get All Endpoints called, Implementation TODO!");
        });
    }
}