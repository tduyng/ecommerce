import { SERVER_LINKS } from 'src/app/constants/links.constant';

export class ResponseError extends Error {
  public response: Response;
  public status: number;
  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
    this.status = response.status || 500;
  }
}

function parseJSON(res: Response) {
  if (res.status === 204 || res.status === 205) {
    return null;
  }
  return res.json();
}

function checkStatus(res: Response) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new ResponseError(res);
  error.response = res;
  error.status = res.status;
  throw error;
}

export async function request(url: string, options?: RequestInit) {
  const moreOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    ...options,
  };
  const fetchResponse = await fetch(url, moreOptions);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}
export async function requestWithAuth(url: string, options?: RequestInit) {
  const moreOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    ...options,
  };
  await fetch(SERVER_LINKS.authAutoRefresh, { ...moreOptions, method: 'POST' });

  const fetchResponse = await fetch(url, moreOptions);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
export async function requestWithAuthSimple(url: string, options?: RequestInit) {
  const moreOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    ...options,
  };
  await fetch(SERVER_LINKS.authAutoRefresh, { ...moreOptions, method: 'POST' });

  const fetchResponse = await fetch(url, moreOptions);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
