import { ServerResponse, IncomingMessage } from "http";

import Request from "./Request";

class Response extends ServerResponse {
  constructor(request: IncomingMessage) {
    super(request);
  }

  send(msg: string) {
    this.writeHead(200, {
      "Content-Type": "text/plain",
    });
    this.write(msg);
    this.end();
  }
}

export default Response;
