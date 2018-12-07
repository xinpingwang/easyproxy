import {IncomingMessage, Server, ServerResponse} from "http";

class SimpleServer {

    private server: Server;
    private port: number;

    constructor(directory: string, port: number) {
        this.port = port;
        this.server = new Server();
        this.server.on("request", function (request: IncomingMessage, response: ServerResponse) {
            response.write("Hello World");
            response.end();
        })
    }

    start() {
        this.server.listen(this.port);
    }

    stop() {
        if (this.server.listening) {
            this.server.close();
        }
    }
}

export {SimpleServer}