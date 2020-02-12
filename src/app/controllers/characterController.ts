import { controller, interfaces, httpPost, request, response, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import SERVICES from '../services/services';
import { BaseController } from './controller';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validation';
import { fetchAllSchema, fetchOneSchema } from '../requestValidation/common';
import { newCharacterSchema } from '../requestValidation/characterValidation';
import CharacterService from '../services/characterService';
import authentication from '../middlewares/authentication';


@controller('/characters')
export default class CharacterController extends BaseController implements interfaces.Controller {
    @inject(SERVICES.CHARACTER_SERVICE)
    private characterService!: CharacterService;

    @httpGet('/', authentication(), validate({ schema: fetchAllSchema }))
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

    @httpPut('/:id')
    async updateCharacter(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const character = await this.characterService.updateCharacter(req);
            res.json(character);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    @httpPost('/:id/restore')
    async restoreCharacter(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const character = await this.characterService.restoreCharacter(req);
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

    @httpDelete('/:id')
    async deleteCharacter(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const character = await this.characterService.deleteCharacter(req);
            res.json(character);
        } catch (error) {
            this.handleError(error, res);
        }
    }
}