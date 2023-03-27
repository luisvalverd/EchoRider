import Request from "../http/Request";
import Response from "../http/Response";
import NextFunction from "../utils/interfaces/NextFunction.interface";
import HttpParser from "../http/HttpParser";

async function parserBody(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //request.body = await request.onBody();
  request.setBody(await request.onBody());
  next();
}

export default parserBody;
