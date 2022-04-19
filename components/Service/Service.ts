import type { ServiceConfigOptions } from '../../context/ServiceContext/ServiceContext.interfaces';

export default class Service {
  private readonly _apiBase: string;

  constructor({ apiBase = '' }: ServiceConfigOptions = {}) {
    this._apiBase = apiBase;
  }

  protected get = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      headers: await this.getHeaders(),
    });
    if (!res.ok) {
      throw new Error('Get request was failed');
    }

    return res;
  };

  protected post = async (url: string, object: object) => {
    const dataRequest = {
      method: 'POST',
      body: JSON.stringify(object),
      headers: await this.getHeaders(),
    };
    const res = await fetch(`${this._apiBase}${url}`, dataRequest);
    if (!res.ok) {
      throw new Error('Post request was failed');
    }

    return res;
  };

  protected getJson = async <T>(url: string) => (this.get(url).then((res) => res.json()) as unknown) as T;

  protected postJson = async <T>(url: string, object: object) => (this.post(url, object).then((res) => res.json()) as unknown) as T;

  private getHeaders = async (): Promise<Headers> => {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return headers;
  };
}
