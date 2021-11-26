import { ServerResponse, createServer, IncomingMessage } from "http";

class Server {
    /**
     * Server constructor
     */
    constructor() {}

    /**
     * Creates HTTP server listening on port 3000
     */
    public static createServer() {
        createServer((_: IncomingMessage, response: ServerResponse) => {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('Hello! First node appliaction\n');
        }).listen(3000);

        console.log('Server started');
    }
}

Server.createServer();