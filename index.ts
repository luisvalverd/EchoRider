import Router from "./src/router/Router";
import Response from "./src/Response";
import Request from "./src/Request";
import EchoRider from "./src/EchoRider";
import { Server, IncomingMessage, ServerResponse, request } from "http";

let app = new EchoRider();

let router = new Router();

router.get("/", (request: Request, response: Response) => {
  return response.send("hola mundo", 204);
});

router.get("/test", (request: Request, response: Response) => {
  response.send("hello test 1");
});

router.get("/test2", (request: Request, response: Response) => {
  response.send("Hello test 2");
});

router.get("/status", (request: Request, response: Response) => {
  //console.log(typeof response.status(210).send("hola mundo"));
  response.send({
    name: "luis",
  });
});

router.get("/json", (request: Request, response: Response) => {
  response.json({
    name: "luis",
    phone: "0992348298",
    age: 27,
  });
});

router.get("/opts", (request: Request, response: Response) => {
  response.options({
    status: 200,
    headers: {
      "Content-Type": "html",
    },
  });
  response.send("ok");
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
