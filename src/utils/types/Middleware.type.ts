import Request from "../../Request";
import Response from "../../Response";

// TODO change next type
type middleware = (request: Request, response: Response, next: any) => void;

export default middleware;
