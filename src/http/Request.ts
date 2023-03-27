import { IncomingMessage } from "http";
import { resolve } from "path";
import RequestInterface from "../utils/interfaces/Request.interface";

class Request extends IncomingMessage implements RequestInterface {
  private _request: IncomingMessage;
  public method: string;
  public url: string;
  public statusCode: number;
  public httpVersion: string;
  public body: any;

  /**
   * @param request
   */
  constructor(request: IncomingMessage) {
    super(request.socket);
    this._request = request;
    this.method = <string>request.method;
    this.url = <string>request.url;
    this.statusCode = <number>request.statusCode;
    this.httpVersion = <string>request.httpVersion;
    this.body = null;
  }

  public onBody = async () => {
    let data = "";
    this._request.on("data", (chunk) => {
      data += chunk;
    });

    await this.on("end", () => {
      this.body = data;
    });

    return data;
  };

  public setBody = (body: any) => {
    this.body = body;
  };
}

export default Request;
