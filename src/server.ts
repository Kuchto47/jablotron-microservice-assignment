import { createServer, Server } from "restify";

/**
 * Class responsible for Rest Server creation and handling
 */
export class RestServer {
    private readonly port: number;
    private readonly host: string;
    private server: Server;

    /**
     * Server constructor
     */
    constructor(port?: number, host?: string) {
        this.port = port ?? 3000;
        this.host = host ?? "127.0.0.1";
    }

    /**
     * Creates HTTP server listening on port 3000
     */
    public createServer(): Server {
        this.server = createServer();
        this.server.listen(this.port, this.host, () => {
            console.log(`Server started, listening at ${this.host}:${this.port}`);
        });

        return this.server;
    }
}