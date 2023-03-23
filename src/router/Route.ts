import Handler from "../utils/types/Handler.type";
import Response from "../Response";
import Request from "../Request";
import NextFunction from "../utils/types/NextFunction.type";

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

  public next = (err: string | undefined, index?: number) => {
    return {
      hanlder: this.stack[index!++],
      index: index!++,
      lenght: this.stack.length - 1,
    };
  };
}
