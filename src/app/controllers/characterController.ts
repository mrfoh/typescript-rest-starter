import { controller, interfaces, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import SERVICES from '../services/services';
import { BaseController } from './controller';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validation';
import { fetchAllSchema, fetchOneSchema } from '../requestValidation/common';
import { newCharacterSchema } from '../requestValidation/characterValidation';
import CharacterService from '../services/characterService';


@controller('/characters')
export default class CharacterController extends BaseController implements interfaces.Controller {
    @inject(SERVICES.CHARACTER_SERVICE)
    private characterService!: CharacterService;

    @httpGet('/', validate({ schema: fetchAllSchema }))
    async getCharacters(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const result = await this.characterService.all(req);
            res.json(result);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    @httpGet('/:id', validate({ schema: fetchOneSchema }))
    async getCharacter(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const character = await this.characterService.getCharacter(req);
            res.json(character);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    @httpPost('/', validate({ schema: newCharacterSchema }))
    async createCharacter(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const character = await this.characterService.addCharacter(req);
            res.json(character);
        } catch (error) {
            this.handleError(error, res);
        }
    }
}