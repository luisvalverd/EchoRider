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
  const body = await request.onBody();
  request.body = JSON.parse(body);
  next();
}

export default parserBody;
