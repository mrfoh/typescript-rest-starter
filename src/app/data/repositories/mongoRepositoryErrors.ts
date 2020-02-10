export class ModelNotFoundError extends Error {
    statusCode = 404;
    type = 'ModelNotFoundError';
    constructor(message: string) {
        super(message);
            Object.setPrototypeOf(this, ModelNotFoundError.prototype);
            Error.captureStackTrace(this, this.constructor);
    }
}

export class SoftDeleteNotSupportedError extends Error {
    statusCode = 400;
    type = 'SoftDeleteNotSupportedError';
    constructor(message: string) {
        super(message);
            Object.setPrototypeOf(this, SoftDeleteNotSupportedError.prototype);
            Error.captureStackTrace(this, this.constructor);
    }
}