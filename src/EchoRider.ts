import { Server, ServerResponse, IncomingMessage, createServer } from "http";
import Request from "./http/Request";
import Response from "./http/Response";
import Middleware from "./Middleware";
import Router from "./router/Router";
import MiddlewareHandler from "./utils/types/Middleware.type";
import NextFunction from "./utils/interfaces/NextFunction.interface";

export default class EchoRider {
  protected server: Server;
  private router: Router;
  private middlewares: Middleware;

  constructor() {
    // initialization creation of server
    this.server = createServer(this.handlerServer);
    this.middlewares = new Middleware();
  }

  private handlerServer = (req: IncomingMessage, res: ServerResponse) => {
    const response = new Response(req, res);
    const request = new Request(req);

    this.middlewares.dispatch(request, response);
    this.router.handleRoute(request, response);
  };

  // use router
  public useRouter = (router: Router, url?: string) => {
    if (!this.router) {
      this.router = router;
    }

    if (url !== undefined && this.router !== undefined) {
      this.router.useRouter(url, router);
    }
  };

  // TODO: add middleware handler
  public useMiddleware = (
    handler: MiddlewareHandler<Request, Response, NextFunction>
  ) => {
    this.middlewares.use(handler);
  };
  /*
  public use = (callback: Handler<Request, Response>) => {
    this.router
  };
  */

  /**
   * * function to listen server
   * @param port
   * @param host
   */
  public listen = (port: number, host?: string) => {
    if (!host) {
      host = "127.0.0.1";
    }
    this.server.listen(port, host, () => {
      console.log(`server listen on ${host}:${port}`);
    });
  };
}
