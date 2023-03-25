import Handler from "../utils/types/Handler.type";
import Response from "../http/Response";
import Request from "../http/Request";

export default class Route {
  public path: string;
  public stack: Array<Handler<Request, Response>>;

  constructor(path: string, stack: Array<Handler<Request, Response>>) {
    this.path = path;
    this.stack = stack;
  }

  protected getPath = () => {
    return this.path;
  };

  public getHandler = (path: string) => {
    if (path === this.path) {
      return this.stack;
    }
    return undefined;
  };

  public useMiddleware = (middleware: Handler<Request, Response>) => {
    this.stack.push(middleware);
  };

  protected dispatch = () => {
    let index = 0;
  };
}
