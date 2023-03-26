import Request from "../http/Request";
import Response from "../http/Response";
import NextFunction from "../utils/interfaces/NextFunction.interface";
import HttpParser from "../http/HttpParser";

async function parserBody(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.body = await request.onBody();
  console.log(request.body);
  next();
}

export default parserBody;
