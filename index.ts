import Router from "./src/Router";
import Response from "./src/Response";
import Request from "./src/Request";
import EchoRider from "./src/EchoRider";
import { Server, IncomingMessage, ServerResponse } from "http";

let app = new EchoRider();

let router = new Router();

router.get("/", (request: Request, response: Response) => {
  return response.send("hola mundo");
});

router.get("/test", (request: Request, response: Response) => {
  response.send("hello test 1");
});

router.get("/test2", (request: Request, response: Response) => {
  response.send("Hello test 2");
});

/*
let sub_router = new Router();

sub_router.get("/test", (request: Request, response: Response) => {
  response.send("<h1>hello sub route</h1>");
});

app.useRouter(router);
app.useRouter(sub_router, "/sub-route");
*/

app.useRouter(router);

app.listen(3000);
