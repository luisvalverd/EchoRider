import { EventEmitter } from "events";
import Response from "./Response";
import Request from "./Request";
import Hanlder from "./utils/types/Hanlder.type";
import Methods from "./utils/Methods";

/**
 * TODO: change IncomingMessage to Request class
 * TODO: change ServerResponse to Response class
 */

class Router extends EventEmitter {
  protected routes: Map<string, Map<string, Hanlder<Request, Response>>>;

  constructor() {
    super();
    this.routes = new Map<string, Map<string, Hanlder<Request, Response>>>();
    this.initializationRoutes();
  }

  /**
   * put methods http in router
   * @return void
   */
  private initializationRoutes = (): void => {
    for (let method in Methods) {
      this.routes.set(method, new Map());
    }
  };

  /**
   * the function match get handler of route
   * * find if not exist method in Router
   * *    before find url exist
   * *    before return hanlder of the route
   * *    if not exist method or url return null
   * @method request
   * @return handler
   */
  public match = (request: Request) => {
    const { url, method } = request;

    console.log(method, "-", url);

    let handlers = this.routes.get(method!);

    if (!handlers) {
      // todo fix the bug
      //this.emit("error", new Error("error in find method"));
      return null;
    }

    let handler: Hanlder<Request, Response> = handlers.get(url!)!;

    if (!handler) {
      try {
        // pass
        this.emit("error", new Error("Error in find route"));
        return null;
      } catch (err: any) {
        new Error(err.msg);
      }
    }

    return handler;
  };

  /**
   * TODO: Change place of pages defaults
   * default page 404
   */
  notFound = (request: Request, response: Response) => {
    /*
    response.writeHead(404, {
      "Content-Type": "text/html",
    });
    response.write("<h1>Error 404</h1>");
    response.end();
    */
    return response.send("404 Error");
  };

  public handleRoute = (request: any, response: Response) => {
    const handler = this.match(request);

    if (handler) {
      handler(request, response);
    } else {
      this.notFound(request, response);
    }
  };

  /**
   * TODO: change IncomingMessage and ServerResponse
   * @param url
   * @param handler
   */
  public get = (url: string, handler: Hanlder<Request, Response>): void => {
    this.routes.get(Methods.GET.toString())!.set(url, handler);
  };

  public post = (url: string, handler: Hanlder<Request, Response>): void => {
    this.routes.get(Methods.POST.toString())!.set(url, handler);
  };

  public delete = (url: string, handler: Hanlder<Request, Response>): void => {
    this.routes.get(Methods.DELETE.toString())!.set(url, handler);
  };

  public update = (url: string, handler: Hanlder<Request, Response>): void => {
    this.routes.get(Methods.UPDATE.toString())!.set(url, handler);
  };

  public put = (url: string, handler: Hanlder<Request, Response>): void => {
    this.routes.get(Methods.PUT.toString())!.set(url, handler);
  };

  public patch = (url: string, handler: Hanlder<Request, Response>): void => {
    this.routes.get(Methods.PATCH.toString())!.set(url, handler);
  };
}

export default Router;
