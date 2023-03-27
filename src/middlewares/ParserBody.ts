import Request from "../http/Request";
import Response from "../http/Response";
import NextFunction from "../utils/interfaces/NextFunction.interface";

/**
 * ? add the body of got in body of request
 * @param request
 * @param response
 * @param next
 */
async function parserBody(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.setBodyJSON(await request.onBody());
  next();
}

export default parserBody;
