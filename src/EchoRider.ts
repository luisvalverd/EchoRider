import { Server, ServerResponse, IncomingMessage, createServer } from "http";
import Request from "./Request";
import Response from "./Response";
import Router from "./router/Router";
import NextFunction from "./utils/types/NextFunction.type";

export default class EchoRider {
  protected server: Server;
  private router: Router;
  constructor() {
    // initialization creation of server
    this.server = createServer(this.handlerServer);
  }

  private handlerServer = (req: IncomingMessage, res: ServerResponse) => {
    const response = new Response(req, res);
    const request = new Request(req);

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
