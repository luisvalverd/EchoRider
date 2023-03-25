type MiddlewareHandler<Request, Response, NextFunction> = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export default MiddlewareHandler;
