import { Server, ServerResponse, IncomingMessage, createServer } from "http";
import Request from "./Request";
import Response from "./Response";
import Router from "./Router";

export default class EchoRider {
  protected server: Server;
  private router: Router;
  constructor() {
    // initialization creation of server
    this.server = createServer(this.handlerServer);
  }

  private handlerServer = (req: IncomingMessage, res: ServerResponse) => {
    let response = new Response(res);
    let request = new Request(req);

    this.router.handleRoute(request, response);
  };

  // use router
  public useRouter = (router: Router) => {
    this.router = router;
  };

  /**
   * * function to listen server
   * @param port
   * @param host
   */
  public listen = (port: number, host?: string) => {
    let host_default;
    if (!host) {
      host_default = "127.0.0.1";
    }
    this.server.listen(port, host, () => {
      console.log(`server listen on ${host}:${port}`);
    });
  };
}
