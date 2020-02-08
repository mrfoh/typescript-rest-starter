import Axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { HttpErrors } from './httpErrors';


export interface HttpClientOptions {
    baseUrl?: string;
    headers?: any;
    debug?: boolean;
}

export class HttpClient {
    client: AxiosInstance;

    constructor(config?: HttpClientOptions) {
        this.client = Axios.create({
            ...(config && config.baseUrl) && { baseURL: config!.baseUrl },
            ...(config && config.headers) && { headers: config!.headers }
        });

        this.client.defaults.headers.common['Content-Type'] = 'application/json';

        if (config && config.debug) {
            this.setupInterceptors();
        }
    }

    private isNetError(error: any) {
        const codes = [ 'ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND', 'ETIMEDOUT', 'EADDRINUSE' ];
        return error.hasOwnProperty('code') && codes.includes(error.code);
    }

    private getConnectionErrorMessage(error: any) {
        let message = '';
        switch (error.code) {
            case 'ECONNREFUSED':
                message = `Connection to ${error.address}:${error.port} refused`;
                break;
            case 'ECONNRESET':
                message = `Connection to ${error.address} reset`;
                break;
            case 'ENOTFOUND':
                message = `DNS lookup for ${error.address} failed`;
                break;
            case 'ETIMEDOUT':
                message = `Request to ${error.address} timedout`;
                break;
        }

        return message;
    }

    private getClientErrorMessage(error: AxiosError) {
        const response = error.response;
        const message = response && response.data && response.data.error
            ? response.data.error.message
            : response && response.data && response.data.message ? response.data.message : error.message;

        return message;
    }

    private handleError(error: Error) {
        const isNetError = this.isNetError(error);
        let message: string;

        if (!isNetError) {
            const {
                request,
                response,
                stack,
                code
            } = <AxiosError>error;

            message = this.getClientErrorMessage(<any>error);
            throw new HttpErrors.ClientError(message, {
                request,
                response,
                stack,
                code
            });
        } else if (isNetError) {
            message = this.getConnectionErrorMessage(error);
            throw new HttpErrors.ConnectionError(message);
        }
    }

    private setupInterceptors() {
        this.client.interceptors.request.use((config) => {
            return config;
        });
    }

    /**
     * Make a post request
     * @param url
     * @param {any} payload
     * @param {AxiosRequestConfig} options
     * @returns {Promise<AxiosResponse<T>>}
     */
    async post<T>(url: string, payload: any, options?: AxiosRequestConfig) {
        try {
            const response = await this.client.post<T>(url, payload, options);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Make a get request
     * @param url
     * @param {AxiosRequestConfig} options
     * @returns {Promise<AxiosResponse<T>>}
     */
    async get<T>(url: string, options?: AxiosRequestConfig) {
        try {
            const response = await this.client.get<T>(url, options);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Make a put request
     * @param url
     * @param {any} payload
     * @param {AxiosRequestConfig} options
     * @returns {Promise<AxiosResponse<T>>}
     */
    async put<T>(url: string, payload: any, options?: AxiosRequestConfig) {
        try {
            const response = await this.client.put<T>(url, payload, options);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Make a patch request
     * @param url
     * @param {any} payload
     * @param {AxiosRequestConfig} options
     * @returns {Promise<AxiosResponse<T>>}
     */
    async patch<T>(url: string, payload: any, options?: AxiosRequestConfig) {
        try {
            const response = await this.client.patch<T>(url, payload, options);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Make a delete request
     * @param url
     * @param {AxiosRequestConfig} options
     * @returns {Promise<AxiosPromise<any>>}
     */
    async delete<T>(url: string, options?: AxiosRequestConfig) {
        try {
            const response = await this.client.delete(url, options);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    async request(config: AxiosRequestConfig) {
        try {
            const response = await this.client(config);
        } catch (error) {
            this.handleError(error);
        }
    }
}
