import Response from "../../src/Response";
import { ServerResponse } from "http";

describe("Response", () => {
  test("method send return status code 200", () => {
    let MockResponse = new Response({} as any, {} as any);
    expect(MockResponse.statusCode).toBe(200);
  });
  test("method send return object", () => {
    let res = new ServerResponse({} as any);
    let MockResponse = new Response({} as any, res);
    expect(typeof MockResponse.send("")).toBe("object");
  });
  test("method send return 300 in status code", () => {
    let res = new ServerResponse({} as any);
    let MockResponse = new Response({} as any, res);
    let data = MockResponse.send("hello", 300);
    expect(data.getStatus()).toBe(300);
    expect(data.statusCode).toBe(300);
  });
  test("method json return object", () => {
    let res = new ServerResponse({} as any);
    let MockResponse = new Response({} as any, res);
    expect(typeof MockResponse.json({ hello: "world" })).toBe("object");
  });
});
