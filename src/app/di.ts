import 'reflect-metadata';
import { Container } from 'inversify';
import IDENTIFIERS from './identifiers';
import REPOS from './data/repositories/repos';
import SERVICES from '../app/services/services';
import { Logger } from 'pino';
import logger from './logger';
// Repositories
import {
    CharacterMongoRepository
} from './data/repositories';

// Add Controlllers
import './controllers';
import CharacterService from './services/characterService';
/**
 * DI Container
 */
const container = new Container();


container
    .bind<Logger>(IDENTIFIERS.LOGGER)
    .toConstantValue(logger);

container
    .bind<CharacterMongoRepository>(REPOS.CHARACTER_REPO)
    .to(CharacterMongoRepository);


container
    .bind<CharacterService>(SERVICES.CHARACTER_SERVICE)
    .to(CharacterService);

export default container;