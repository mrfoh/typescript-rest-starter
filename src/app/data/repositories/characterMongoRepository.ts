import { injectable } from 'inversify';
import { MongoRepository } from './mongoRepository';
import { ICharacter, CharacterSchema } from '../models/character';

@injectable()
export class CharacterMongoRepository extends MongoRepository<ICharacter> {
    constructor() {
        super('Character', CharacterSchema);
    }
}