import NextFunction from "./NextFunction.type";

type Hanlder<Request, Response> = (
  request: Request,
  response: Response,
  next?: NextFunction
) => void;

export default Hanlder;
