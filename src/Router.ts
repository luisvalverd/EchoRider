import { EventEmitter } from "events";
import Response from "./Response";
import Request from "./Request";
import Hanlder from "./utils/types/Hanlder.type";
import Methods from "./utils/Methods";

class Router extends EventEmitter {
  /**
   * the router should a other sub route inside
   */
  protected routes: Map<string, Map<string, Hanlder<Request, Response>>>;
  //protected sub_router: Map<string, Router>;

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
   * * firts need what if url has a Sub Router
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

    let handler: Hanlder<Request, Response> | Router = handlers.get(url!)!;

    if (!handler) {
      try {
        // pass
        this.emit("error", new Error("Error in find route"));
        return null;
      } catch (err: any) {
        new Error(err.msg);
      }
    }

    // TODO: identify if is Handler or Router
    return <Hanlder<Request, Response>>handler;
  };

  /**
   * TODO: Change place of pages defaults
   * default page 404
   */
  notFound = (request: Request, response: Response) => {
    response.setHeader("content-type", "html");
    return response.send("404 Error");
  };

  // TODO: change any type
  public handleRoute = (request: any, response: Response) => {
    const handler = this.match(request);

    if (handler) {
      handler(request, response);
    } else {
      this.notFound(request, response);
    }
  };

  /**
   * * this need a sub uri
   * save sub router
   * @param uri
   * @param router
   */
  public useRouter = (uri: string, router: Router) => {
    let primary_uri = uri;
    let sub_router = router.getRouter();

    if (!router) {
      this.emit("error", new Error("Error in instance Sub Router"));
      return null;
    }

    for (let method in Methods) {
      let route = Array.from(sub_router.get(method.toString())!.entries())[0]; // get with a array the map

      if (route !== undefined) {
        let sub_uri = route[0]; // get path uri of sub route
        let uri = primary_uri!.concat(sub_uri); // join uri with sub uri of route

        this.routes.get(method.toString())?.set(uri, route[1]);
      }
    }
  };

  public getRouter = () => {
    return this.routes;
  };

  /**
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
