import { IncomingMessage, Server, ServerResponse } from "http";
import * as fs from "fs";
import * as url from "url";
import * as path from "path"

class SimpleServer {

    private server: Server;
    private port: number;

    constructor(directory: string, port: number) {
        this.port = port;
        this.server = new Server();
        this.server.on("request", function (request: IncomingMessage, response: ServerResponse) {
            let requestPath = url.parse(request.url).pathname;
            let filePath = path.resolve(directory) + requestPath;
            fs.stat(filePath, function (error, stats) {
                if (!error && stats.isFile()) {
                    response.writeHead(200);
                    fs.createReadStream(filePath).pipe(response);
                } else {
                    response.writeHead(404);
                    response.end("404 Node Found")
                }
            })
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

export { SimpleServer }