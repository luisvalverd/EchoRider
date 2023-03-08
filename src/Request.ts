import { IncomingMessage } from "http";
import RequestInterface from "./utils/interfaces/Request.interface";

class Request implements RequestInterface {
  private _request: IncomingMessage;

  public method: string;
  public url: string;
  public statusCode: number;
  public httpVersion: string;
  public headers: Object;

  constructor(request: IncomingMessage) {
    this._request = request;
    this.method = request.method!;
    this.url = request.url!;
    this.statusCode = request.statusCode!;
    this.httpVersion = request.httpVersion!;
    this.headers = request.headers;
  }
}

export default Request;
