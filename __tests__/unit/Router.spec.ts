import Router from "../../src/Router";
import Request from "../../src/Request";
import Response from "../../src/Response";

describe("Router", () => {
  test("return a function with router methods to match", () => {
    let router = new Router();
    expect("function").toEqual(typeof router.handleRoute);
    expect("function").toEqual(typeof router.match);
  });

  test("get error in match function of router", () => {
    let router = new Router();

    let req: any = {
      url: "/test",
      method: "GET",
    };
    expect(null || "undefined").toBe(typeof router.match(req));
  });

  test("add route of method get", () => {
    let router = new Router();

    let req: any = {
      url: "/test/get",
      method: "GET",
    };

    router.get("/test/get", (request: Request, response: Response) => {});

    // if not get null is add successfully route
    expect("function").toBe(typeof router.match(req));
  });

  test("add route of method post", () => {
    let router = new Router();

    let req: any = {
      url: "/test/post",
      method: "POST",
    };

    router.post("/test/post", (request: Request, response: Response) => {});

    expect("function").toBe(typeof router.match(req));
  });

  test("add route of method put", () => {
    let router = new Router();

    let req: any = {
      url: "/test/put",
      method: "PUT",
    };

    router.put("/test/put", (request: Request, response: Response) => {});

    expect("function").toBe(typeof router.match(req));
  });

  test("add route of method delete", () => {
    let router = new Router();

    let req: any = {
      url: "/test/delete",
      method: "DELETE",
    };

    router.delete("/test/delete", (request: Request, response: Response) => {});

    expect("function").toBe(typeof router.match(req));
  });

  test("add route of method patch", () => {
    let router = new Router();

    let req: any = {
      url: "/test/patch",
      method: "PATCH",
    };

    router.patch("/test/patch", (request: Request, response: Response) => {});

    expect("function").toBe(typeof router.match(req));
  });

  test("add sub route in router", () => {
    let router = new Router();
    let sub_router = new Router();

    sub_router.get("/sub_route", (request: Request, response: Response) => {});

    expect(undefined).toBe(router.useRouter("/test", sub_router));
  });

  test("find sub route in router", () => {
    let router = new Router();
    let sub_router = new Router();

    let req: any = {
      url: "/test/sub_route",
      method: "GET",
    };

    sub_router.get("/sub_route", (request: Request, response: Response) => {});
    router.useRouter("/test", sub_router);

    expect("function").toBe(typeof router.match(req));
  });
});
