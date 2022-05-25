import axios from 'axios';
import type { ServiceConfigOptions } from '../context/ServiceContext/ServiceContext.interfaces';

// Service initialization for sending requests
export default class Service {
    private readonly _apiBase: string;

    constructor({ apiBase = '' }: ServiceConfigOptions = {}) {
        this._apiBase = apiBase;
    }

    protected get = async (url: string) => {
        const { data } = await axios.get(`${this._apiBase}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://dev.entangle.fi',
            },
        });
        if (!data) {
            throw new Error('Get request was failed');
        }

        return data;
    };

    protected post = async (url: string, object: object) => {
        const dataRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://dev.entangle.fi',
            },
        };
        const { data } = await axios.post(`${this._apiBase}${url}`, object, dataRequest);
        if (!data) {
            throw new Error('Post request was failed');
        }

        return data;
    };

    protected getJson = async <T>(url: string) =>
        this.get(url).then((res) => res) as unknown as T;

    protected postJson = async <T>(url: string, object: object) =>
        this.post(url, object).then((res) => res) as unknown as T;

    private getHeaders = async (): Promise<Headers> => {
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return headers;
    };
}
