import { controller, interfaces, request, response, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/hello')
export default class HelloController implements interfaces.Controller {
    @httpGet('/')
    async showHelloMessage(
        @request() req: Request,
        @response() res: Response,
    ) {
        res.json({
            message: 'Hello!'
        });
    }
}