import { injectable, inject } from 'inversify';
import IDENTIFIERS from '../identifiers';
import { Logger } from 'pino';
import { Response } from 'express';
import { ModelNotFoundError } from '../data/repositories/mongoRepositoryErrors';

@injectable()
export class BaseController {
    @inject(IDENTIFIERS.LOGGER)
    readonly logger!: Logger;

    private parseError(error: Error) {
        let status: number;
        let message: string;
        let errors: any[];

        message = error.message;
        errors = <any>error['errors'];

        if (error instanceof ModelNotFoundError) {
            status = 404;
        } else {
            status = errors
                ? 422
                : 400;
        }

        return {
            status,
            message,
            errors
        };
    }

    handleError(error: Error, res: Response) {
        this.logger.error(error);
        const { message, status, errors } = this.parseError(error);
        res.status(status);
        res.json({ message, ...errors && { errors } });
    }
}