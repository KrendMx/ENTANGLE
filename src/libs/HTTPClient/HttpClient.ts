import type { IHttpClient } from './HttpClient.interfaces';
import { axios } from './axios';

export const HttpClient: IHttpClient = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};
