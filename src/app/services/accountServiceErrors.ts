import { HttpStatus } from "../constants";

export class AccountNotFoundError extends Error {
    statusCode = HttpStatus.NOT_FOUND;
    type = 'AccountNotFoundError';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, AccountNotFoundError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AccountLockedError extends Error {
    statusCode = HttpStatus.AUTHENICATION_ERROR;
    type = 'AccountLockedError';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, AccountLockedError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidLoginCredentialsError extends Error {
    statusCode = HttpStatus.BAD_REQUEST;
    type = 'InvalidLoginCredentialsError';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidLoginCredentialsError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}