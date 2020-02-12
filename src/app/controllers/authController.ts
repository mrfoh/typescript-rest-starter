import { inject } from 'inversify';
import SERVICES from '../services/services';
import { controller, interfaces, httpPost, request, response } from 'inversify-express-utils';
import { BaseController } from './controller';
import { Request, Response } from 'express';
import AccountService from '../services/accountService';


@controller('/auth')
export default class AuthController extends BaseController implements interfaces.Controller {
    @inject(SERVICES.ACCOUNT_SERVICE)
    private accountService!: AccountService;

    @httpPost('/login')
    async autheticateUser(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const {
                email,
                password
            } = req.body;

            const { account, token} = await this.accountService
                .authenticateUserByEmailPassword({ email, password });

            res.json({
                account,
                token
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }
}