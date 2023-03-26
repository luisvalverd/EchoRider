import * as httpParser from "http-parser-js";
import HttpMessage from "../utils/interfaces/HttpMessage.interface";

class HttpParser {
  private parser: any;
  private message: HttpMessage;

  constructor() {
    this.parser = new httpParser.HTTPParser(httpParser.HTTPParser.REQUEST);
    this.message = {
      method: "",
      url: "",
      headers: {},
      body: "",
    };
  }

  public parse = (data: Buffer): HttpMessage => {
    this.parser.execute(data);
    this.onBody(data);
    return this.message;
  };

  public getMessage = () => {
    return this.message;
  };

  private onMessageBegin = (url: string) => {
    this.message.url += url;
  };

  private onHeaderfield = (field: string) => {
    this.message.headers[field] = "";
  };

  private onHeaderValue = (value: string) => {
    const headers = Object.keys(this.message.headers);
    const lastHeader = headers[headers.length - 1];
    this.message.headers[lastHeader] += value;
  };

  private onHeadersComplete = (info: any) => {
    this.message.method = httpParser.methods[info.method];
  };

  private onBody = (body: Buffer) => {
    this.setBody(body.toString());
  };

  private setBody = (body: string) => {
    this.message.body += body;
  };

  public getBody = () => {
    return this.message.body;
  };
}

export default HttpParser;
