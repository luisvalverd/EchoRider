import { IncomingMessage } from "http";
import RequestInterface from "./utils/interfaces/Request.interface";

class Request extends IncomingMessage {
  //private _request: IncomingMessage;
  public method: string;
  public url: string;
  public statusCode: number;
  public httpVersion: string;

  constructor(request: IncomingMessage) {
    super(request.socket);
    //this._request = request;
    this.method = request.method!;
    this.url = request.url!;
    this.statusCode = request.statusCode!;
    this.httpVersion = request.httpVersion!;
  }
}

export default Request;
