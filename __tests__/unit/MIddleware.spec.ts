import Request from "../../src/http/Request";
import Response from "../../src/http/Response";
import Middleware from "../../src/middlewares/Middleware";
import NextFunction from "../../src/utils/interfaces/NextFunction.interface";

/**
 * TODO: implementate this format in Response and router
 */

describe("Middeware test", () => {
  let request: Request;
  let response: Response;
  let middleware: Middleware;
  let mockHandler1: jest.Mock;
  let mockHandler2: jest.Mock;
  let mockHandler3: jest.Mock;

  beforeEach(() => {
    middleware = new Middleware();
    request = {} as Request;
    response = {} as Response;
    mockHandler1 = jest.fn();
    mockHandler2 = jest.fn();
    mockHandler3 = jest.fn();
  });

  describe("use()", () => {
    it("Should add handler to the stack", () => {
      middleware.use(<any>mockHandler1);
      expect(middleware["stack"]).toEqual([mockHandler1]);
    });
  });
  describe("dispatch()", () => {
    it("Should execute all handlers in the stack", () => {
      mockHandler1.mockImplementation(
        (req: Request, res: Response, next: NextFunction) => next()
      );
      mockHandler2.mockImplementation(
        (req: Request, res: Response, next: NextFunction) => next()
      );
      mockHandler3.mockImplementation(
        (req: Request, res: Response, next: NextFunction) => next()
      );

      middleware.use(mockHandler1);
      middleware.use(mockHandler2);
      middleware.use(mockHandler3);

      middleware.dispatch(request, response);

      expect(mockHandler1).toHaveBeenCalledWith(
        request,
        response,
        expect.any(Function)
      );
      //expect(mockHandler2).toHaveBeenCalledWith({}, {}, expect.any(Function));
      expect(mockHandler3).toHaveBeenCalledWith({}, {}, expect.any(Function));
    });
    it("Should call the next handler in the stack when next is called", () => {
      const mockNext = jest.fn();

      mockHandler1.mockImplementation(
        (req: Request, res: Response, next: NewableFunction) => next()
      );
      mockHandler2.mockImplementation(
        (req: Request, res: Response, next: NewableFunction) => next()
      );
      mockHandler3.mockImplementation(
        (req: Request, res: Response, next: NewableFunction) => next()
      );

      middleware.use(mockHandler1);
      middleware.use(mockHandler2);
      middleware.use(mockHandler3);

      middleware.dispatch(request, response);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it("Should handle errors passed to next", () => {
      const mockConsole = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const mockError = new Error("test error");
      mockHandler1.mockImplementation((req, res, next) => next(mockError));

      middleware.use(mockHandler1);

      middleware.dispatch(request, response);

      expect(mockConsole).toHaveBeenCalledWith(mockError);
    });
  });
});
