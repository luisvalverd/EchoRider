import { ServerResponse } from "http";

interface ResponseInterface extends ServerResponse {
  send(msj: string): void;
  json(): void;
}

export default ResponseInterface;
