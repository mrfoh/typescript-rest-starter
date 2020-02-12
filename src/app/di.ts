import 'reflect-metadata';
import { Container } from 'inversify';
import IDENTIFIERS from './identifiers';
import REPOS from './data/repositories/repos';
import SERVICES from '../app/services/services';
import { Logger } from 'pino';
import { EventEmitter } from 'events';
import logger from './logger';
import emitter from './emitter';
// Repositories
import {
    CharacterMongoRepository, AccountMongoRepository
} from './data/repositories';
import CharacterService from './services/characterService';
import AccountService from './services/accountService';

// Add Controlllers
import './controllers';

/**
 * DI Container
 */
const container = new Container();


container
    .bind<Logger>(IDENTIFIERS.LOGGER)
    .toConstantValue(logger);
container
    .bind<EventEmitter>(IDENTIFIERS.EMITTER)
    .toConstantValue(emitter);

container
    .bind<AccountMongoRepository>(REPOS.ACCOUNT_REPO)
    .to(AccountMongoRepository);
container
    .bind<CharacterMongoRepository>(REPOS.CHARACTER_REPO)
    .to(CharacterMongoRepository);


container
    .bind<CharacterService>(SERVICES.CHARACTER_SERVICE)
    .to(CharacterService);
container
    .bind<AccountService>(SERVICES.ACCOUNT_SERVICE)
    .to(AccountService);

export default container;