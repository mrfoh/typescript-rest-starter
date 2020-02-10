import joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus, SCHEMA_OPTIONS } from '../constants';


interface ValidationOptions {
    schema: joi.AnySchema;
}

function formatError(error: joi.ValidationError) {
    return error.details.map(_error => {
        return {
            param: _error.context!.key,
            msg: _error.message
        };
    });
}


export function validate(options: ValidationOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
        options.schema
            .validateAsync(req, SCHEMA_OPTIONS)
            .then(_value => next())
            .catch(error => {
                res.status(HttpStatus.VALIDATION_ERROR);
                res.json({
                    type: 'ValidationError',
                    message: 'There were errors in your request',
                    errors: formatError(error)
                });
                return;
            });
    };
}