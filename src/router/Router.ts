//import { EventEmitter } from "events";
import Response from "../http/Response";
import Request from "../http/Request";
import Handler from "../utils/types/Handler.type";
import Methods from "../utils/Methods";
import Route from "./Route";
import MiddlewareHandler from "../utils/types/Middleware.type";
import NextFunction from "../utils/interfaces/NextFunction.interface";

class Router {
  /**
   * the router should a other sub route inside
   */
  protected routes: Map<string, Array<Route>>;
  //protected sub_router: Map<string, Router>;

  constructor() {
    this.routes = new Map<string, Array<Route>>();
  }

  /**
   * the function match get handler of route
   * firts need what if url has a Sub Router
   * find if not exist method in Router
   * before find url exist
   * before return Handler of the route
   * if not exist method or url return null
   * @method request
   * @return handler
   */
  public match = (request: Request) => {
    const { url, method } = request;

    console.log(method, "-", url);

    const handlers = this.routes.get(method);

    if (!handlers) {
      // todo fix the bug
      //this.emit("error", new Error("error in find method"));
      return null;
    }

    let handler: Route;

    for (handler of handlers) {
      if (!handler) {
        continue;
      }

      if (handler.isMatch(url)) {
        return handler;
      }
    }

    return null;
  };

  /**
   * TODO: Change place of pages defaults
   * default page 404
   */
  notFound = (request: Request, response: Response) => {
    response.setHeader("content-type", "html");
    return response.send("404 Error");
  };

  /**
   * use hanlder of the route and match method and method
   * @param request
   * @param response
   * @param next
   */
  public handleRoute = async (request: Request, response: Response) => {
    const handler: Route = this.match(request)!;

    if (!handler) {
      this.notFound(request, response);
    }

    if (handler !== null) {
      handler.dispatch(request, response);
    }
  };

  /**
   * * this need a sub uri
   * use routes get uri this is parent route and get routes of subrouter
   * for each method of Methods add the paths and methods of subRoute in
   * Router.
   *
   * For get path and handler need tranform Map<string, Handler> in Array
   * when to get in index 0 the path and index 1 the Handler of route. path
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
    let path = uri;
    const sub_router = router.getRouter();

    if (!router) {
      //this.emit("error", new Error("Error in instance Sub Router"));
      return null;
    }

    for (const method in Methods) {
      let route;
      let method_sub_route;

      if (sub_router.get(method.toString()) !== undefined) {
        route = sub_router.get(method.toString());

        method_sub_route = method.toString();
      }

      if (route !== undefined) {
        for (let i = 0; i < route.length; i++) {
          const sub_uri = route[i].path; // get path uri of sub route

          path = path.concat(sub_uri);

          if (this.routes.get(method.toString()) !== undefined) {
            this.routes
              .get(method.toString())
              ?.push(new Route(path, route[i].stack));
          } else {
            if (method_sub_route !== undefined) {
              this.routes.set(method_sub_route, [
                new Route(path, route[i].stack),
              ]);
            }
          }
        }
      }
    }
  };

  /**
   * for each method of Enum Methods and get routes saved
   * if not undefined for each route concat array of middlewares of to add
   * @param handlers
   */
  public useMiddlewareAll = (
    handlers:
      | MiddlewareHandler<Request, Response, NextFunction>
      | MiddlewareHandler<Request, Response, NextFunction>[]
  ) => {
    for (const method in Methods) {
      if (!method) continue;

      const routes = this.routes.get(method);

      if (!routes) continue;

      for (const route of routes) {
        if (!Array.isArray(handlers)) {
          route.use(handlers);
          continue;
        }
        route.stack.concat(handlers);
      }
    }
  };

  /**
   * get all routes
   * @returns Routes
   */
  private getRouter = () => {
    return this.routes;
  };

  public get = (
    url: string,
    handler: Array<Handler<Request, Response>>
  ): void => {
    if (!this.routes.get(Methods.GET.toString())) {
      this.routes.set(Methods.GET.toString(), [new Route(url, handler)]);
      return;
    }

    this.routes.get(Methods.GET.toString())?.push(new Route(url, handler));

    return;
  };

  public post = (url: string, handler: Array<Handler<Request, Response>>) => {
    if (!this.routes.get(Methods.POST.toString())) {
      this.routes.set(Methods.POST.toString(), [new Route(url, handler)]);
      return;
    }

    this.routes.get(Methods.POST.toString())?.push(new Route(url, handler));

    return;
  };

  public delete = (url: string, handler: Array<Handler<Request, Response>>) => {
    if (!this.routes.get(Methods.DELETE.toString())) {
      this.routes.set(Methods.DELETE.toString(), [new Route(url, handler)]);
      return;
    }

    this.routes.get(Methods.DELETE.toString())?.push(new Route(url, handler));

    return;
  };

  public update = (url: string, handler: Array<Handler<Request, Response>>) => {
    if (!this.routes.get(Methods.UPDATE.toString())) {
      this.routes.set(Methods.UPDATE.toString(), [new Route(url, handler)]);
      return;
    }

    this.routes.get(Methods.UPDATE.toString())?.push(new Route(url, handler));

    return;
  };

  public put = (url: string, handler: Array<Handler<Request, Response>>) => {
    if (!this.routes.get(Methods.PUT.toString())) {
      this.routes.set(Methods.PUT.toString(), [new Route(url, handler)]);
      return;
    }

    this.routes.get(Methods.PUT.toString())?.push(new Route(url, handler));

    return;
  };

  public patch = (url: string, handler: Array<Handler<Request, Response>>) => {
    if (!this.routes.get(Methods.PATCH.toString())) {
      this.routes.set(Methods.PATCH.toString(), [new Route(url, handler)]);
      return;
    }

    this.routes.get(Methods.PATCH.toString())?.push(new Route(url, handler));

    return;
  };
}

export default Router;
