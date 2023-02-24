import ResponseInterface from "./utils/interfaces/Response.interface"
import {ServerResponse} from "http";

class Response extends ServerResponse {

  constructor() {
    super();
  }

  // send text
  public send = (msj: string) => {
    console.log("ok");
    this.writeHead(200, {
      "Content-Type": "Text/plain",
    })
    this.write(msj);
    this.end();
  }
}

export default Response;
