import { IncomingMessage } from 'http';
import * as https from 'https';
import * as url from 'url';

interface FetchOptions {
  body?: string;
  headers?: {};
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

class Response {
  constructor(private readonly response: IncomingMessage) {}

  public get ok(): boolean {
    return (this.response.statusCode && this.response.statusCode >= 200 && this.response.statusCode <= 400) ?
      true : false;
  }

  public json() {
    return new Promise((resolve, reject) => {
      let jsonString = '';
      this.response.setEncoding('utf8');
      this.response.on('data', (chunk: string | Buffer) => {
          jsonString = jsonString + (chunk as string);
      });
      this.response.on('end', () => {
        resolve(JSON.parse(jsonString));
      });
    });
  }

  public get statusText(): string | undefined {
    return this.response.statusMessage;
  }
}

export async function fetch(urlString: string, options: FetchOptions): Promise<Response> {
  const legacyUrl = url.parse(urlString);
  const requestOptions = {
    ...{
      body: options.body,
      headers: options.headers,
      method: options.method ? options.method : 'GET',
    },
    ...legacyUrl,
  };
  return new Promise<Response>((resolve, reject) => {
    const request = https.request(requestOptions, (response: IncomingMessage) => {
      resolve(new Response(response));
    });
    request.on('error', (err: Error) => {
      reject(err);
    });
    request.end();
  });
}
