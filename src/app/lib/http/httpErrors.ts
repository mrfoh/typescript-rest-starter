import { AxiosResponse } from 'axios';

export namespace HttpErrors {
    export class ClientError extends Error {
        /**
         * HTTP Response Status
         */
        status: number;
        response?: AxiosResponse<any>;

        constructor(message: string, options: { request: any, response?: AxiosResponse<any>, stack?: string, code?: string }) {
            super(message);
            const { response, stack, code } = options;
            this.status = response && response.status
                ? response.status
                : 0;
            this.stack = stack;
            this.response = response;
            Object.setPrototypeOf(this, ClientError.prototype);
            Error.captureStackTrace(this, this.constructor);
        }
    }

    export class ConnectionError extends Error {
        constructor(message: string) {
            super(message);
            Object.setPrototypeOf(this, ConnectionError.prototype);
            Error.captureStackTrace(this, this.constructor);
        }
    }

    export function formatError(error: Error) {
        if (error instanceof ClientError) {
            const { status, response } = error;
            const responseBody = response
                ? response.data
                : {};
            return {
                status,
                responseBody
            };
        }
        return error;
    }
}