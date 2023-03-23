import NextFunction from "./NextFunction.type";

type Handler<Request, Response> = (
  request: Request,
  response: Response,
  next?: NextFunction
) => void;

export default Handler;
