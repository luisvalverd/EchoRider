import Router from "./src/Router";
import Response from "./src/Response";
import { createServer, IncomingMessage, ServerResponse } from "http";

let router = new Router();

router.get("/", (request: IncomingMessage, response: Response) => {
  /*
  response.writeHead(200, {
    "Content-Type": "Text/plain",
  });
  response.write("home page");
  response.end();
  */
  console.log(typeof response.send("hola"));
});

router.get("/test", (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, {
    "Content-Type": "Text/plain",
  });
  response.write("hola test");
  response.end();
});

router.get("/test2", (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, {
    "Content-Type": "Text/plain",
  });
  response.write("hola test 2");
  response.end();
});

let server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    router.handleRoute(request, response);
  }
);

server.listen(8000, () => {
  console.log("listen on port 8000");
});
