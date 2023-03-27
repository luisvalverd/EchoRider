import { Server, ServerResponse, IncomingMessage, createServer } from "http";
import Request from "./http/Request";
import Response from "./http/Response";
import Middleware from "./middlewares/Middleware";
import Router from "./router/Router";
import MiddlewareHandler from "./utils/types/Middleware.type";
import NextFunction from "./utils/interfaces/NextFunction.interface";
import parserBody from "./middlewares/ParserBody";
export default class EchoRider {
  protected server: Server;
  private router: Router;

  constructor() {
    // initialization creation of server
    this.server = createServer(this.handlerServer);

    this.useMiddleware(parserBody);
  }

  private handlerServer = (req: IncomingMessage, res: ServerResponse) => {
    const response = new Response(req, res);
    const request = new Request(req);

    this.router.useMiddlewareAll(parserBody);
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

  /**
   * add middleware global in application
   * TODO: add middleware specific route using path
   * @param handler
   */
  public useMiddleware = (
    handler: MiddlewareHandler<Request, Response, NextFunction>,
    path?: string
  ) => {
    //this.middlewares.use(handler);
  };

  /**
   * * function to listen server
   * @param port
   * @param host
   */
  public listen = (port: number, host?: string) => {
    // default host
    if (!host) {
      host = "127.0.0.1";
    }

    this.server.listen(port, host, () => {
      console.log(`server listen on ${host}:${port}`);
    });
  };
}
