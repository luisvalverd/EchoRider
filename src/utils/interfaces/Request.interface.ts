interface RequestInterface {
  method: string;
  url: string;
  statusCode: number;
  httpVersion: string;
  headers: Object;
}

export default RequestInterface;
