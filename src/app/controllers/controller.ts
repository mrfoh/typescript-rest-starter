import { injectable, inject } from 'inversify';
import IDENTIFIERS from '../identifiers';
import { Logger } from 'pino';
import { Response } from 'express';
import { HttpStatus } from '../constants';

@injectable()
export class BaseController {
    @inject(IDENTIFIERS.LOGGER)
    readonly logger!: Logger;

    private parseError(error: Error) {
        let status: number;
        let message: string;
        let errors: any[];
        let type: string;

        message = error.message;
        errors = <any>error['errors'];
        status = error['statusCode'] || HttpStatus.BAD_REQUEST;
        type = error['type'] || 'BadRequestError';

        return {
            status,
            message,
            errors,
            type
        };
    }

    handleError(error: Error, res: Response) {
        this.logger.error(error.message, error);
        const { message, status, errors, type } = this.parseError(error);
        res.status(status);
        res.json({ type, message, ...errors && { errors } });
    }
}