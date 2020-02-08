/**
 * HTTP Status Codes
 */
export enum HttpStatus {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    VALIDATION_ERROR = 422,
    OK = 200,
    ACCEPTED = 201,
    INTERNAL_SERVER_ERROR = 500,
    AUTHENICATION_ERROR = 401,
    PERMISSION_DENIED = 403
}
/**
 * @hapi/joi schema options
 */
export const SCHEMA_OPTIONS = {
    abortEarly: false,
    allowUnknown: true,
    skipFunctions: true,
    escapeHtml: false
};