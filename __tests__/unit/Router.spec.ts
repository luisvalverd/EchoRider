import Router from "../../src/router/Router";
import Request from "../../src/http/Request";
import Response from "../../src/http/Response";
import { IncomingMessage, ServerResponse } from "http";

describe("Router", () => {
  let router: Router;
  let sub_router: Router;
  let request: Request;
  let response: Response;
  let mockHandler1: jest.Mock;
  let mockHandler2: jest.Mock;
  let mockHandler3: jest.Mock;

  beforeEach(() => {
    router = new Router();
    sub_router = new Router();
    request = {
      method: "GET",
      url: "/test",
    } as Request;
    response = new Response(
      {} as IncomingMessage,
      new ServerResponse({} as IncomingMessage)
    );
    mockHandler1 = jest.fn();
    mockHandler2 = jest.fn();
    mockHandler3 = jest.fn();
  });

  describe("match()", () => {
    it("should match null with route not defined", () => {
      expect(router.match(request)).toBeNull();
    });

    it("should add route to the stack of Route", () => {
      router.get("/test", [mockHandler1]);
      expect([mockHandler1]).toEqual(router.match(request)?.stack);
    });
  });
  describe("handlerRoute()", () => {
    it("should handler execute successfully", () => {
      router.get("/test", [mockHandler1]);
      router.handleRoute(request, response);
      expect(mockHandler1).toHaveBeenCalledWith(
        request,
        response,
        expect.any(Function)
      );
    });

    it("should execute all routes", () => {
      router.get("/test", [mockHandler1]);
      router.post("/test", [mockHandler2]);
      router.update("/test", [mockHandler3]);

      router.handleRoute(request, response);

      request.method = "POST";
      router.handleRoute(request, response);

      request.method = "UPDATE";
      router.handleRoute(request, response);

      expect(mockHandler1).toHaveBeenCalledWith(
        request,
        response,
        expect.any(Function)
      );
      expect(mockHandler2).toHaveBeenCalledWith(
        request,
        response,
        expect.any(Function)
      );
      expect(mockHandler3).toHaveBeenCalledWith(
        request,
        response,
        expect.any(Function)
      );
    });

    // TODO: delete test
    it("should execute not found page", () => {
      router.handleRoute(request, response);
      expect(mockHandler1).not.toHaveBeenCalled();
    });
  });

  describe("useRouter()", () => {
    it("should add sub router", () => {
      sub_router.get("/test", [mockHandler1]);
      router.useRouter("/sub-route", sub_router);

      request.url = "/sub-route/test";

      expect([mockHandler1]).toEqual(router.match(request)?.stack);
    });

    it("should return null if pass null router", () => {
      expect(router.useRouter("/test", <Router>(<unknown>null))).toBeNull();
    });
  });

  describe("useMiddlewareAll()", () => {
    it("should add middlewares successfully", () => {
      router.get("/test", [mockHandler1]);
      router.useMiddlewareAll(mockHandler2);
      router.useMiddlewareAll(mockHandler3);
      expect([mockHandler3, mockHandler2, mockHandler1]).toEqual(
        router.match(request)?.stack
      );
    });
  });

  it("return a function with router methods to match", () => {
    expect("function").toEqual(typeof router.handleRoute);
    expect("function").toEqual(typeof router.match);
  });

  it("get error in match function of router", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test";
    req.method = "GET";

    expect(router.match(req)).toBe(null);
  });

  it("add route of method get", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/get";
    req.method = "GET";

    router.get("/test/get", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    // if not get null is add successfully route
    expect(typeof router.match(req)).toBe("object");
  });

  it("add route of method post", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/post";
    req.method = "POST";

    router.post("/test/post", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    expect(typeof router.match(req)).toBe("object");
  });

  it("add route of method put", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/put";
    req.method = "PUT";

    router.put("/test/put", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    expect(typeof router.match(req)).toBe("object");
  });

  it("add route of method delete", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/delete";
    req.method = "DELETE";

    router.delete("/test/delete", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    expect(typeof router.match(req)).toBe("object");
  });

  it("add route of method patch", () => {
    const router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/patch";
    req.method = "PATCH";

    router.patch("/test/patch", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    expect(typeof router.match(req)).toBe("object");
  });

  it("add sub route in router", () => {
    const router = new Router();
    const sub_router = new Router();

    sub_router.get("/sub_route", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    expect(undefined).toBe(router.useRouter("/test", sub_router));
  });

  it("find sub route in router", () => {
    const router = new Router();
    const sub_router = new Router();

    const req: Request = new Request({} as IncomingMessage);

    req.url = "/test/sub_route";
    req.method = "GET";

    sub_router.get("/sub_route", [
      (request: Request, response: Response) => {
        const http_version = request.httpVersion;
        response.send(http_version);
      },
    ]);

    router.useRouter("/test", sub_router);

    expect(typeof router.match(req)).toBe("object");
  });
});
