import Request from "./http/Request";
import Response from "./http/Response";
import MiddlewareHandler from "./utils/types/Middleware.type";
import NextFunction from "./utils/interfaces/NextFunction.interface";

class Middleware {
  public stack: MiddlewareHandler<Request, Response, NextFunction>[];

  constructor() {
    this.stack = [];
  }

  /**
   * add handler to stack;
   * @param handler
   */
  public use = (
    handler: MiddlewareHandler<Request, Response, NextFunction>
  ) => {
    this.stack.push(handler);
  };

  public dispatch = (request: Request, response: Response) => {
    let index = 0;

    const next: NextFunction = (err?: Error) => {
      if (err) {
        // TODO: handler error
        console.log(err);
        return;
      }

      index++;

      if (index < this.stack.length) {
        this.stack[index](request, response, next);
      }
    };

    this.stack[index](request, response, next);
  };
}

export default Middleware;
