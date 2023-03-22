import { ServerResponse, IncomingMessage } from "http";
import { Buffer } from "buffer";
import mime from "mime";
import { Options } from "./utils/interfaces/Options.interface";

/**
 * TODO: status(int) method send to status
 * ? send status code of request
 * TODO: json(obj) method
 * ? send to json to the user
 * TODO: implementate method sendFile();
 * TODO: add header in Response too
 */
export class Response extends ServerResponse {
  private _response: ServerResponse;
  public statusCode: number;

  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request);
    this._response = response;
    this.statusCode = 200; // default status code
  }

  /**
   * * send a resposne in type html/text default if not get content-type
   * * indentify if has a content-type
   * * default content-type is html
   *    TODO: implementate obtions
   * * options is object and has statusCode, headers, etc...
   * ? if body is a object send how a json
   * ? if not object send how html
   * @param body
   * @param status
   */
  public send = (body: string | object, status?: number, opts?: Options) => {
    let chunk = body;
    const content_type = this._response.getHeader("Content-Type");

    if (opts !== undefined) {
      this.options(opts);
    }

    if (content_type === undefined || content_type === "") {
      switch (typeof chunk) {
        case "string": {
          this._setHeader("Content-Type", "html");
          break;
        }
        case "object": {
          this._setHeader("Content-Type", "json");
          break;
        }
      }
    }

    if (status !== undefined) {
      this._response.statusCode = status;
      this.setStatus(status);
    }

    switch (typeof chunk) {
      case "string": {
        if (chunk !== undefined) {
          chunk = Buffer.from(chunk, "utf-8");
        }
        break;
      }
      case "object": {
        if (chunk !== undefined && typeof chunk === "object") {
          chunk = Buffer.from(JSON.stringify(chunk), "utf-8");
        }
        break;
      }
    }

    this._response.end(chunk, "utf-8");

    return this;
  };

  /**
   * TODO make options
   * @param data
   * @param status optional
   * @param opts  optional
   * @returns
   */
  public json = (body: object, status?: number, opts?: Options) => {
    let chunk = body;
    const content_type = this._response.getHeader("Content-Type");

    if (opts !== undefined) {
      this.options(opts);
    }

    if (content_type === undefined || content_type === "") {
      this._setHeader("Content-Type", "json");
    }

    if (status !== undefined) {
      this._response.statusCode = status;
      this.setStatus(status);
    }

    if (chunk !== undefined) {
      chunk = Buffer.from(JSON.stringify(chunk), "utf-8");
    }

    this._response.end(chunk, "utf-8");

    return this;
  };

  /**
   * @param status
   * @returns
   */
  public status = (status: number) => {
    this._response.statusCode = status;
    this.statusCode = status;
    return this;
  };

  public options = (opts: Options) => {
    if (opts.status !== undefined) {
      this.status(opts.status);
    }

    if (opts.headers !== undefined) {
      const list_headers = Object.entries(opts.headers);

      list_headers.forEach((header: Array<string>) => {
        this._setHeader(header[0], header[1]);
      });
    }

    return this;
  };

  /**
   * * set header
   * @param field
   * @param value
   */
  public _setHeader = (field: string, value: string) => {
    if (field.toLowerCase() === "content-type") {
      const val = mime.getType(value);
      this._response.setHeader(field, <string>val);
      this.setHeader(field, <string>val);
      return;
    }
    this._response.setHeader(field, value);
    this.setHeader(field, value);
  };

  public getStatus = () => {
    return this._response.statusCode;
  };

  protected setStatus = (status: number) => {
    this.statusCode = status;
  };
}

export default Response;
