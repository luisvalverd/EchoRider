import Handler from "../utils/types/Handler.type";
import Response from "../http/Response";
import Request from "../http/Request";
import MiddlewareHandler from "../utils/types/Middleware.type";
import NextFunction from "../utils/interfaces/NextFunction.interface";
import Middleware from "../Middleware";

export default class Route extends Middleware {
  public path: string;
  public stack: MiddlewareHandler<Request, Response, NextFunction>[];

  constructor(
    path: string,
    stack: MiddlewareHandler<Request, Response, NextFunction>[]
  ) {
    super();
    this.path = path;
    this.stack = stack;
  }

  public isMatch = (path: string) => {
    if (path !== this.path) return false;
    return true;
  };

  protected getPath = () => {
    return this.path;
  };

  public useMiddleware = (middleware: Handler<Request, Response>) => {
    this.stack.push(middleware);
  };
}
