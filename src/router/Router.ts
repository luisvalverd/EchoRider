import { EventEmitter } from "events";
import Response from "../Response";
import Request from "../Request";
import Hanlder from "../utils/types/Hanlder.type";
import Methods from "../utils/Methods";

class Router extends EventEmitter {
  /**
   * the router should a other sub route inside
   */
  protected routes: Map<string, Map<string, Hanlder<Request, Response>>>;
  //protected sub_router: Map<string, Router>;

  constructor() {
    super();
    this.routes = new Map<string, Map<string, Hanlder<Request, Response>>>();
  }

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
  public match = (request: Request): Hanlder<Request, Response> | null => {
    const { url, method } = request;

    console.log(method, "-", url);

    let handlers = this.routes.get(method);

    if (!handlers) {
      // todo fix the bug
      //this.emit("error", new Error("error in find method"));
      return null;
    }

    let handler = handlers.get(url!)!;

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
   * use routes get uri this is parent route and get routes of subrouter
   * for each method of Methods add the paths and methods of subRoute in
   * Router.
   *
   * For get path and handler need tranform Map<string, Hanlder> in Array
   * when to get in index 0 the path and index 1 the hanlder of route. path
   *
   * Router
   * {
   *    GET: {
   *      "/path1": handler,
   *      "/path2": handler,
   *    }
   * }
   *
   * SubRouter
   * {
   *    POST: {
   *      "/path1": handler,
   *      "/path2": handler,
   *    }
   *    GET: {
   *      "/path3": handler
   *    }
   * }
   *
   * * use method to add sub router
   * useRouter("/sub-router", SubRouter);
   *
   * Router
   * {
   *    GET: {
   *      "/path1": handler,
   *      "/path2": handler,
   *      "/sub-router/path3": handler,
   *    },
   *    POST: {
   *      "/sub-router/path1": handler,
   *      "/sub-router/path2": handler,
   *    }
   * }
   *
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
      let route;
      let method_sub_route;

      if (sub_router.get(method.toString()) !== undefined) {
        route = Array.from(sub_router.get(method.toString())!.entries())[0];
        method_sub_route = method.toString();
      }

      if (route !== undefined) {
        let sub_uri = route[0]; // get path uri of sub route

        let uri = primary_uri!.concat(sub_uri); // join uri with sub uri of route

        if (this.routes.get(method.toString()) !== undefined) {
          this.routes.get(method.toString())?.set(uri, route[1]);
        } else {
          if (method_sub_route !== undefined) {
            this.routes.set(method_sub_route, new Map().set(uri, route[1]));
          }
        }
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
    if (!this.routes.get(Methods.GET.toString())) {
      this.routes.set(Methods.GET.toString(), new Map().set(url, handler));
      return;
    }

    this.routes.get(Methods.GET.toString())!.set(url, handler);

    return;
  };

  public post = (url: string, handler: Hanlder<Request, Response>): void => {
    if (!this.routes.get(Methods.POST.toString())) {
      this.routes.set(Methods.POST.toString(), new Map().set(url, handler));
      return;
    }

    this.routes.get(Methods.POST.toString())!.set(url, handler);

    return;
  };

  public delete = (url: string, handler: Hanlder<Request, Response>): void => {
    if (!this.routes.get(Methods.DELETE.toString())) {
      this.routes.set(Methods.DELETE.toString(), new Map().set(url, handler));
      return;
    }

    this.routes.get(Methods.DELETE.toString())!.set(url, handler);

    return;
  };

  public update = (url: string, handler: Hanlder<Request, Response>): void => {
    if (!this.routes.get(Methods.UPDATE.toString())) {
      this.routes.set(Methods.UPDATE.toString(), new Map().set(url, handler));
      return;
    }

    this.routes.get(Methods.UPDATE.toString())!.set(url, handler);

    return;
  };

  public put = (url: string, handler: Hanlder<Request, Response>): void => {
    if (!this.routes.get(Methods.PUT.toString())) {
      this.routes.set(Methods.PUT.toString(), new Map().set(url, handler));
      return;
    }

    this.routes.get(Methods.PUT.toString())!.set(url, handler);

    return;
  };

  public patch = (url: string, handler: Hanlder<Request, Response>): void => {
    if (!this.routes.get(Methods.PATCH.toString())) {
      this.routes.set(Methods.PATCH.toString(), new Map().set(url, handler));
      return;
    }

    this.routes.get(Methods.PATCH.toString())!.set(url, handler);

    return;
  };
}

export default Router;
