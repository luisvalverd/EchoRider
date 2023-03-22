import Router from "../../src/router/Router";
import Request from "../../src/Request";
import Response from "../../src/Response";
import { IncomingMessage } from "http";

describe("Router", () => {
  test("return a function with router methods to match", () => {
    const router = new Router();
    expect("function").toEqual(typeof router.handleRoute);
    expect("function").toEqual(typeof router.match);
  });

  test("get error in match function of router", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test";
    req.method = "GET";

    expect(router.match(req)).toBe(null);
  });

  test("add route of method get", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/get";
    req.method = "GET";

    router.get("/test/get", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });

    // if not get null is add successfully route
    expect(typeof router.match(req)).toBe("function");
  });

  test("add route of method post", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/post";
    req.method = "POST";

    router.post("/test/post", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });

    expect(typeof router.match(req)).toBe("function");
  });

  test("add route of method put", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/put";
    req.method = "PUT";

    router.put("/test/put", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });

    expect("function").toBe(typeof router.match(req));
  });

  test("add route of method delete", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/delete";
    req.method = "DELETE";

    router.delete("/test/delete", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });

    expect("function").toBe(typeof router.match(req));
  });

  test("add route of method patch", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/patch";
    req.method = "PATCH";

    router.patch("/test/patch", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });

    expect("function").toBe(typeof router.match(req));
  });

  test("add sub route in router", () => {
    const router = new Router();
    const sub_router = new Router();

    sub_router.get("/sub_route", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });

    expect(undefined).toBe(router.useRouter("/test", sub_router));
  });

  test("find sub route in router", () => {
    const router = new Router();
    const sub_router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/sub_route";
    req.method = "GET";

    sub_router.get("/sub_route", (request: Request, response: Response) => {
      const http_version = request.httpVersion;
      response.send(http_version);
    });
    router.useRouter("/test", sub_router);

    expect("function").toBe(typeof router.match(req));
  });
});
