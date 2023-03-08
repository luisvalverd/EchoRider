import Router from "./src/Router";
import Response from "./src/Response";
import Request from "./src/Request";
import {
  createServer,
  IncomingMessage,
  ServerResponse,
  RequestListener,
} from "http";
// testing EchoRider class server
import EchoRider from "./src/EchoRider";

let router = new Router();

router.get("/", (request: Request, response: Response) => {
  /*
  response.writeHead(200, {
    "Content-Type": "Text/plain",
  });
  response.write("home page");
  response.end();
  */
  response.send("hola mundo");
});

/*
router.get("/test", (request: Request, response: Response) => {
  response.writeHead(200, {
    "Content-Type": "Text/plain",
  });
  response.write("hola test");
  response.end();
});

router.get("/test2", (request: Request, response: Response) => {
  response.writeHead(200, {
    "Content-Type": "Text/plain",
  });
  response.write("hola test 2");
  response.end();
});
*/

let server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // instance my request
  let request = new Request(req);
  let response = new Response(res);

  router.handleRoute(request, response);
});

server.listen(8000, () => {
  console.log(`listen on port 8000`);
});
