import Request from "../../Request";
import Response from "../../Response";

type Hanlder<Request, Response> = (
  request: Request,
  response: Response
) => void;

export default Hanlder;
