import Response from "../../src/http/Response";
import { IncomingMessage, ServerResponse } from "http";

describe("Response", () => {
  test("method send return status code 200", () => {
    const MockResponse = new Response(
      {} as IncomingMessage,
      {} as ServerResponse
    );

    expect(MockResponse.statusCode).toBe(200);
  });
  test("method send return object", () => {
    const res = new ServerResponse({} as IncomingMessage);
    const MockResponse = new Response({} as IncomingMessage, res);

    expect(typeof MockResponse.send("")).toBe("object");
  });
  test("method send return 300 in status code", () => {
    const res = new ServerResponse({} as IncomingMessage);
    const MockResponse = new Response({} as IncomingMessage, res);

    const data = MockResponse.send("hello", 300);

    expect(data.getStatus()).toBe(300);
    expect(data.statusCode).toBe(300);
  });
  test("method json return object", () => {
    const res = new ServerResponse({} as IncomingMessage);
    const MockResponse = new Response({} as IncomingMessage, res);

    expect(typeof MockResponse.json({ hello: "world" })).toBe("object");
  });
  // test opstions
  test("options return object", () => {
    const res = new ServerResponse({} as IncomingMessage);
    const MockResponse = new Response({} as IncomingMessage, res);

    expect(typeof MockResponse.options({})).toBe("object");
  });
  test("options change status and header default", () => {
    const res = new ServerResponse({} as IncomingMessage);
    const MockResponse = new Response({} as IncomingMessage, res);

    MockResponse.options({
      status: 300,
      headers: {
        "Content-Type": "json",
      },
    });

    expect(MockResponse.getStatus()).toBe(300);
    expect(MockResponse.getHeader("Content-Type")).toBe("application/json");
  });
});
