import Hanlder from "../utils/types/Hanlder.type";
import Response from "../Response";
import Request from "../Request";

export default class Route {
  public path: string;
  public stack: Array<Hanlder<Request, Response>>;

  constructor(path: string, stack: Array<Hanlder<Request, Response>>) {
    this.path = path;
    this.stack = stack;
  }
}
