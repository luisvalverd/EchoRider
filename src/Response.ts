import { ServerResponse } from "http";
import { Buffer } from "buffer";
import mime from "mime";

/**
 * TODO: status(int) method send to status
 * ? send status code of request
 * TODO: json(obj) method
 * ? send to json to the user
 */
export class Response {
  private _response: ServerResponse;

  constructor(response: ServerResponse) {
    this._response = response;
  }

  /**
   * * send a resposne in type html/text default if not get content-type
   * @param body
   * @param status
   */
  public send = (body: any, status?: number): void => {
    let chunk = body;
    let content_type = this._response.getHeader("Content-Type");

    if (content_type === undefined || content_type === "") {
      this.setHeader("Content-Type", "html");
    }

    if (chunk !== undefined) {
      chunk = Buffer.from(chunk, "utf-8");
    }
    this._response.end(chunk, "utf-8");
  };

  /**
   * * set header
   * @param field
   * @param value
   */
  public setHeader = (field: string, value: string) => {
    if (field.toLowerCase() === "content-type") {
      let val = mime.getType(value);
      this._response.setHeader(field, <string>val);
      return;
    }
    this._response.setHeader(field, value);
  };
}

export default Response;
