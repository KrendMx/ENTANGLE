type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

type Method =
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'

interface IHttpClientConfig {
    url?: string;
    method?: Method;
    baseUrl?: string;
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    timeoutErrerMessage?: string;
    withCreditials?: boolean;
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    decompress?: boolean;
}

interface IHttpClientResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: IHttpClientConfig;
    request?: any;
}

interface IHttpClient {
    get<T = any, R = IHttpClientResponse<T>>(url: string, config?: IHttpClientConfig): Promise<R>,
    post<T = any, R = IHttpClientResponse<T>>(url: string, config?: IHttpClientConfig): Promise<R>,
    put<T = any, R = IHttpClientResponse<T>>(url: string, config?: IHttpClientConfig): Promise<R>,
    patch<T = any, R = IHttpClientResponse<T>>(url: string, config?: IHttpClientConfig): Promise<R>,
    delete<T = any, R = IHttpClientResponse<T>>(url: string, config?: IHttpClientConfig): Promise<R>,
}

export type {
    IHttpClient,
    IHttpClientResponse,
};
