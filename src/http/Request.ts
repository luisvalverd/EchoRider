import { IncomingMessage } from "http";
import RequestInterface from "../utils/interfaces/Request.interface";

class Request extends IncomingMessage implements RequestInterface {
  //private _request: IncomingMessage;
  public method: string;
  public url: string;
  public statusCode: number;
  public httpVersion: string;

  constructor(request: IncomingMessage) {
    super(request.socket);
    //this._request = request;
    this.method = <string>request.method;
    this.url = <string>request.url;
    this.statusCode = <number>request.statusCode;
    this.httpVersion = <string>request.httpVersion;
  }
}

export default Request;
