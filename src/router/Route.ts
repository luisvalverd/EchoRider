export default class Route {
  public path: string;
  public stack: Array<any>;

  constructor(path: string, stack: Array<any>) {
    this.path = path;
    this.stack = stack;
  }
}
