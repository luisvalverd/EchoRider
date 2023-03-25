import NextFunction from "../interfaces/NextFunction.interface";

type Handler<Request, Response> = (
  request: Request,
  response: Response,
  next?: NextFunction
) => void;

export default Handler;
