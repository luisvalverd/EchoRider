import Response from "../../src/Response";
import { ServerResponse } from "http";

describe("Response", () => {
  test("method send run successfully", () => {
    let MockResponse = new Response({} as any, {} as any);
    expect(MockResponse.statusCode).toBe(200);
  });
  test("method send return object", () => {
    let res = new ServerResponse({} as any);
    let MockResponse = new Response({} as any, res);
    expect(typeof MockResponse.send("")).toBe("object");
  });
});
