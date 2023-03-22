interface RequestInterface {
  method: string;
  url: string;
  statusCode: number;
  httpVersion: string;
  headers: object;
}

export default RequestInterface;
