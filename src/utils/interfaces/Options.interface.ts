export interface Options {
  status?: number;
  headers?: {
    "Content-Type"?: string;
    "WWW-Authenticate"?: any;
    "Keep-Alive"?: string;
    "Set-Cookie"?: any;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Credentials"?: any;
    "Access-Control-Allow-Headers"?: any;
    "Access-Control-Allow-Methods"?: any;
    "Content-Encoding"?: any;
    Cookie?: any;
    Accept?: any;
    Autorization?: any;
    Connection?: any;
  };
}

// TODO: add more headers
