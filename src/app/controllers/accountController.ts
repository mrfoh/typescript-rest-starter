import { inject } from 'inversify';
import SERVICES from '../services/services';
import { controller, interfaces, httpPost, request, response } from 'inversify-express-utils';
import { BaseController } from './controller';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validation';
import { newAccountSchema } from '../requestValidation/accountValidation';

import AccountService from '../services/accountService';

@controller('/accounts')
export default class AccountController extends BaseController implements interfaces.Controller {
    @inject(SERVICES.ACCOUNT_SERVICE)
    private accountService!: AccountService;
    @httpPost('/', validate({ schema: newAccountSchema }))
    async createAccount(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const result = await this.accountService.create(req);
            res.json(result);
        } catch (error) {
            this.handleError(error, res);
        }
    }
}