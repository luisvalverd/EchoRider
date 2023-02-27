import { IncomingMessage } from "http";
import { Socket } from "net";

class Request extends IncomingMessage {
  constructor(socket: Socket) {
    super(socket);
  }
}

export default new Request(new Socket()) as Request as IncomingMessage;
