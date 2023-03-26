interface HttpMessage {
  method: string;
  url: string;
  headers: { [key: string]: string };
  body: string;
}

export default HttpMessage;
