export interface Options {
  status?: number;
  headers?: {
    "Content-Type"?: string;
    "WWW-Authenticate"?: string;
    "Keep-Alive"?: string;
    "Set-Cookie"?: string;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Credentials"?: string;
    "Access-Control-Allow-Headers"?: string;
    "Access-Control-Allow-Methods"?: string;
    "Content-Encoding"?: string;
    Cookie?: string;
    Accept?: string;
    Autorization?: string;
    Connection?: string;
  };
}
// TODO: change types headers
// TODO: add more headers
