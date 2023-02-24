import { EventEmitter } from "events"
import { IncomingMessage, ServerResponse } from "http";
import Response from "./Response";
import Methods from "./utils/Methods";


class Router extends EventEmitter {

  protected routes: Map<string, Map<string, any>>
  protected route: Map<string, any>

  constructor() {
    super();
    this.routes = new Map<string, Map<string, any>>();
    // initialization of methods
    this.initializationRoutes();
  }

  /**
    * put methods http in router 
    */
  private initializationRoutes = () => {
    for (let method in Methods) {
      this.routes.set(method, new Map());
    }
  }


  /**
    * the function match get handler of route
    * @method request
    * @return handler
    */
  public match = (request: IncomingMessage) => {
    const { url, method } = request

    console.log(method, "-", url);

    let handlers = this.routes.get(method!);

    if (!handlers) {
      this.emit("error", new Error('error in find method'));
      return null;
    }

    let handler = handlers.get(url!);

    if (!handler) {
      this.emit("error", new Error("Error in find route"));
      return null;
    }

    return handler;

  }

  /**
    * default page 404 
    */
  notFound = (request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(404, {
      "Content-Type": "text/plain",
    })
    response.write("Error 404");
    response.end();
  }

  public handleRoute = (request: IncomingMessage, response: Response) => {
    const handler = this.match(request);

    if (handler) {
      handler(request, response);
    } else {
      this.notFound(request, response);
    }

  }

  public get = (url: string, handler: any): void => {
    this.routes.get(Methods.GET.toString())!.set(url, handler);
  }

  public post = (url: string, handler: any): void => {
    this.routes.get(Methods.POST.toString())!.set(url, handler);
  }

  public delete = (url: string, handler: any): void => {
    this.routes.get(Methods.DELETE.toString())!.set(url, handler);
  }

  public update = (url: string, handler: any): void => {
    this.routes.get(Methods.UPDATE.toString())!.set(url, handler);
  }

  public put = (url: string, handler: any): void => {
    this.routes.get(Methods.PUT.toString())!.set(url, handler);
  }

  public patch = (url: string, handler: any): void => {
    this.routes.get(Methods.PATCH.toString())!.set(url, handler);
  }
}

export default Router;
