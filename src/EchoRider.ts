import { Server, ServerResponse, IncomingMessage, createServer } from "http";
import Request from "./Request";
import Response from "./Response";

export default class EchoRider {
  protected server: Server;
  constructor() {
    // initialization creation of server
    this.server = createServer(this.handlerServer);
  }

  // TODO: send all methods of a class in hanlder
  private handlerServer = (
    request: IncomingMessage,
    response: ServerResponse
  ) => {};

  public listen = (port: number, host: string) => {
    this.server.listen(port, host, () => {
      console.log(`server listen on ${host}:${port}`);
    });
  };
}
