import { injectable, inject } from 'inversify';
import REPOS from '../data/repositories/repos';
import { CharacterMongoRepository } from '../data/repositories/characterMongoRepository';
import { Request } from 'express';
import { ICharacter } from '../data/models/character';

@injectable()
export default class CharacterService {
    @inject(REPOS.CHARACTER_REPO)
    private characterRepository!: CharacterMongoRepository;

    /**
     * Create a new character
     * @param {Request} req
     * @return {Promise<ICharacter>}
     */
    async addCharacter(req: Request): Promise<ICharacter> {
        try {
            const attrs = req.body;
            return await this.characterRepository.create(attrs);
        } catch (error) {
            throw error;
        }
    }

    async all(req: Request) {
        try {
            const {
                archived = false,
                perPage = 20,
                page = 1,
                sortBy = 'createdAt',
                sortOrder = 'ascending'
            } = req.query;

            const query = {
                archived,
                conditions: {},
                sortBy,
                sortOrder,
                page,
                perPage,
            };

            return await this.characterRepository.all(query);
        } catch (error) {
            throw error;
        }
    }

    async getCharacter(req: Request) {
        try {
            const character = await this.characterRepository.getOneById(req.params.id);
            return character;
        } catch (error) {
            throw error;
        }
    }

    async updateCharacter(req: Request) {
        try {
            const { id } = req.params;
            const attrs = req.body;
            const character = await this.characterRepository.update(id, attrs);
            return character;
        } catch (error) {
            throw error;
        }
    }

    async deleteCharacter(req: Request) {
        try {
            const { id } = req.params;
            const character = await this.characterRepository.archive(id);
            return character;
        } catch (error) {
            throw error;
        }
    }

    async restoreCharacter(req: Request) {
        try {
            const { id } = req.params;
            const character = await this.characterRepository.restore(id);
            return character;
        } catch (error) {
            throw error;
        }
    }
}
